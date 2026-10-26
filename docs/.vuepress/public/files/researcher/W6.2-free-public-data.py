#!/usr/bin/env python3
"""Download 90 complete UTC days of Uniswap Ethereum DEX USD volume.

Free, no sign-in and no third-party Python packages required.
Source: DefiLlama public DEX-volume API (not Dune).
Creates: uniswap_ethereum_90days.csv, W6.2-data-provenance.txt,
         W6.2-source-snapshot.json (provider chain-level rows for the selected dates).

Usage: python W6.2-free-public-data.py
"""

import csv
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.request import Request, urlopen

URL = (
    "https://api.llama.fi/summary/dexs/uniswap"
    "?dataType=dailyVolume&excludeTotalDataChart=false"
    "&excludeTotalDataChartBreakdown=false"
)


def extract_eth_volume(payload, today_utc):
    """Extract exactly 90 complete days, rejecting missing/duplicate dates."""
    first_day = today_utc - timedelta(days=90)
    last_day = today_utc - timedelta(days=1)
    chart = payload.get("totalDataChartBreakdown")
    if not isinstance(chart, list) or not chart:
        raise ValueError("No chain-level daily history (totalDataChartBreakdown) returned.")

    dates = {}
    chain_rows = {}
    for point in chart:
        if not isinstance(point, (list, tuple)) or len(point) < 2:
            continue
        timestamp, chain_values = point[:2]
        day = datetime.fromtimestamp(int(timestamp), timezone.utc).date()
        if day < first_day or day > last_day:
            continue
        if not isinstance(chain_values, dict):
            raise ValueError(f"No chain breakdown for {day}; cannot isolate Ethereum.")
        matches = [v for k, v in chain_values.items() if isinstance(k, str) and k.lower() == "ethereum"]
        if len(matches) != 1:
            raise ValueError(f"No unambiguous Ethereum volume on {day}; do not use cross-chain total.")
        value = matches[0]
        try:
            # DefiLlama splits each chain by Uniswap version (V1, V2, V3, V4, ...).
            # The Ethereum total for the day is the sum of those versions.
            if isinstance(value, dict):
                amount = sum(float(v) for v in value.values())
            else:
                amount = float(value)
        except (TypeError, ValueError) as exc:
            raise ValueError(f"Non-numeric Ethereum volume for {day}: {value!r}") from exc
        if not 0 <= amount < float("inf"):
            raise ValueError(f"Invalid USD volume for {day}: {amount}")
        if day in dates:
            raise ValueError(f"Duplicate day in response: {day}")
        dates[day] = amount
        chain_rows[day] = {"Ethereum": value, "ethereum_total_usd": round(amount, 2)}

    expected = [first_day + timedelta(days=i) for i in range(90)]
    missing = [str(day) for day in expected if day not in dates]
    if missing:
        raise ValueError(
            f"Missing {len(missing)} days (e.g., {', '.join(missing[:5])}). "
            "Do not call missing observations verified zero-volume days."
        )
    selected = [(day.isoformat(), dates[day]) for day in expected]
    snapshot = [{"day_utc": day.isoformat(), "chain_breakdown": chain_rows[day]} for day in expected]
    return selected, first_day, last_day, snapshot


def main():
    request = Request(URL, headers={"User-Agent": "W6.2-research-lesson/1.0"})
    with urlopen(request, timeout=40) as response:
        payload = json.load(response)

    retrieved_at = datetime.now(timezone.utc)
    rows, first_day, last_day, snapshot = extract_eth_volume(payload, retrieved_at.date())
    csv_path = Path("uniswap_ethereum_90days.csv")
    with csv_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["day_utc", "volume_usd"])
        for day, amount in rows:
            writer.writerow([day, f"{amount:.2f}"])

    Path("W6.2-source-snapshot.json").write_text(
        json.dumps({
            "source_url": URL,
            "retrieved_utc": retrieved_at.isoformat(timespec="seconds"),
            "dates_inclusive": [str(first_day), str(last_day)],
            "daily_chain_breakdown": snapshot,
        }, indent=2, ensure_ascii=False) + "\n", encoding="utf-8",
    )

    (Path("W6.2-data-provenance.txt")).write_text(
        f"Source: {URL}\n"
        f"Retrieved at (UTC): {retrieved_at.isoformat(timespec='seconds')}\n"
        f"Metric: DefiLlama reported daily Uniswap Ethereum DEX volume in USD\n"
        f"Window: {first_day} through {last_day}, inclusive (90 full UTC days)\n"
        f"Rows: {len(rows)}\n"
        f"Notes: Provider-derived USD estimate; not transactions, unique wallets or users. "
        f"Historical figures may be revised.\n",
        encoding="utf-8",
    )
    print(f"Saved {csv_path}: 90 dates, {first_day} to {last_day} (UTC)")
    print("Saved W6.2-data-provenance.txt and W6.2-source-snapshot.json")
    print("Open CSV in LibreOffice Calc to chart daily volume and compare the first and last 30 days.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        raise SystemExit(f"Unable to download an auditable 90-day series: {exc}") from exc
