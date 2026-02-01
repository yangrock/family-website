#!/usr/bin/env python3
"""
简单的HTTP服务器，用于在本地运行家庭网站
"""

import http.server
import socketserver
import webbrowser
import os

# 服务器配置
PORT = 8000
DIRECTORY = "."  # 当前目录

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    # 切换到脚本所在目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    print("=" * 50)
    print("杨家家庭网站 - 本地服务器")
    print("=" * 50)
    print(f"服务器将在 http://localhost:{PORT} 启动")
    print("按 Ctrl+C 停止服务器")
    print("-" * 50)

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            # 在浏览器中打开网站
            webbrowser.open(f"http://localhost:{PORT}")

            print(f"服务器已启动！")
            print(f"在浏览器中访问: http://localhost:{PORT}")
            print("-" * 50)

            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n服务器已停止。")
    except Exception as e:
        print(f"启动服务器时出错: {e}")
        print("请确保端口 8000 未被其他程序占用。")

if __name__ == "__main__":
    main()