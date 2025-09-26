import requests
from bs4 import BeautifulSoup
import json
import re

url = 'https://minecraftjapan.miraheze.org/wiki/%E5%9C%B0%E5%9B%B3/%E8%A1%A8%E7%A4%BA%E8%89%B2'
normal_headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36"
}


def fetch_standard_colors(_url, headers):
    resp = requests.get(_url, headers=headers)
    soup = BeautifulSoup(resp.text, 'html.parser')

    data = []
    rgb_pattern = re.compile(r'(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})')

    # テーブルごとに探索
    for table in soup.find_all('table', {'class': 'wikitable'}):
        for tr in table.find_all('tr'):
            tds = tr.find_all(['td', 'th'])
            if not tds:
                continue
            print(tds)
            # 右隣のセルが色データ
            if len(tds) < 2:
                continue
            text = tds[1].get_text().strip()
            if not text:
                continue

            color_style = tds[0].get_text()
            in_detail_mode = False
            relative_block_evaluation = 0
            # 行頭が「標準」かどうか確認
            if '明' in color_style:
                in_detail_mode = True
                relative_block_evaluation = +1

            elif '標準' in color_style:
                in_detail_mode = False
                relative_block_evaluation = 0

            elif '暗' in color_style and '最暗' not in color_style:
                in_detail_mode = True
                relative_block_evaluation = -1
            else: # '最暗'などの場合は無視
                continue

            # RGB形式 "111,222,333"
            m = rgb_pattern.search(text)
            if m:
                r, g, b = map(int, m.groups())
                data.append(
                    {"detailMode": in_detail_mode,
                     "relativeEvaluation": relative_block_evaluation,
                     "r": r, "g": g, "b": b})
                continue

    return {"standard_colors": data}


def main():
    colors = fetch_standard_colors(url, headers=normal_headers)
    with open('standard_colors.json', 'w', encoding='utf-8') as f:
        json.dump(colors, f, ensure_ascii=False, indent=2)


if __name__ == '__main__':
    main()
