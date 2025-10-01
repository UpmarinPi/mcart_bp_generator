import os
import argparse

def list_png_files(folder_path, recursive=False):
    if recursive:
        png_files = []
        for root, _, files in os.walk(folder_path):
            for f in files:
                if f.lower().endswith(".png"):
                    png_files.append(f)  # ファイル名だけ
        return png_files
    else:
        return [
            f for f in os.listdir(folder_path)
            if f.lower().endswith(".png")
        ]

def main():
    parser = argparse.ArgumentParser(description="指定フォルダ内のPNGファイル一覧を保存するツール")
    parser.add_argument("folder", help="PNGファイルを探すフォルダのパス")
    parser.add_argument(
        "-o", "--output", default="png_list.txt",
        help="出力ファイル名（デフォルト: png_list.txt）"
    )
    parser.add_argument(
        "-r", "--recursive", action="store_true",
        help="サブフォルダも含めて検索する"
    )
    args = parser.parse_args()

    # PNGファイル一覧取得
    png_files = list_png_files(args.folder, recursive=args.recursive)

    # 保存（拡張子なし）
    with open(args.output, "w", encoding="utf-8") as f:
        for name in png_files:
            basename, _ = os.path.splitext(name)
            f.write(basename + "\n")

    print(f"{len(png_files)} 件のPNGファイル名を {args.output} に保存しました")

if __name__ == "__main__":
    main()