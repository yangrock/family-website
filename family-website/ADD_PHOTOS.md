# 如何添加家庭照片

本指南将帮助您将真实的家庭照片添加到网站中。

## 步骤1：准备照片

1. 选择您想要展示的家庭照片
2. 建议将照片尺寸调整为：
   - 宽度：800-1200像素
   - 高度：自动比例
   - 格式：JPG或PNG
3. 为照片命名，例如：
   - `family-reunion-2024.jpg`
   - `birthday-party.jpg`
   - `vacation-trip.png`

## 步骤2：上传照片

将照片复制到以下目录：
```
family-website/assets/photos/
```

## 步骤3：更新网站

编辑 `index.html` 文件，找到相册部分（大约第150-170行）：

```html
<div class="gallery-placeholder">
    <div class="photo-frame">
        <i class="fas fa-camera"></i>
        <p>家庭合影</p>
    </div>
    <div class="photo-frame">
        <i class="fas fa-camera"></i>
        <p>节日聚会</p>
    </div>
    <!-- ... 更多占位符 ... -->
</div>
```

将占位符替换为真实的图片标签：

```html
<div class="gallery-placeholder">
    <div class="photo-frame">
        <img src="assets/photos/family-reunion-2024.jpg" alt="家庭合影">
        <p>2024年家庭聚会</p>
    </div>
    <div class="photo-frame">
        <img src="assets/photos/birthday-party.jpg" alt="生日庆祝">
        <p>生日庆祝</p>
    </div>
    <!-- 添加更多照片 -->
</div>
```

## 步骤4：调整样式（可选）

如果需要调整照片显示样式，编辑 `style.css` 文件：

```css
.photo-frame img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
}

.photo-frame {
    padding: 15px;
    text-align: center;
}

.photo-frame p {
    margin-top: 10px;
    font-weight: 500;
    color: #333;
}
```

## 照片建议

1. **家庭合影** - 全家福照片
2. **节日庆祝** - 春节、中秋等节日照片
3. **生日聚会** - 家庭成员生日庆祝
4. **旅行回忆** - 家庭旅行照片
5. **日常时光** - 日常生活照片
6. **特殊时刻** - 毕业、婚礼等重要时刻

## 注意事项

1. **隐私保护**：只分享您愿意公开的照片
2. **文件大小**：确保照片文件大小合理（建议<1MB）
3. **备份原始照片**：始终保留原始照片的备份
4. **版权**：确保您有权使用这些照片

## 高级功能

如果您想添加更多相册功能，可以考虑：

1. **相册轮播** - 自动轮播显示照片
2. **照片放大** - 点击照片查看大图
3. **相册分类** - 按年份、事件分类照片
4. **照片上传** - 允许家庭成员上传照片

## 需要帮助？

如果您在添加照片时遇到问题，可以参考以下资源：
- [HTML img标签教程](https://www.w3schools.com/tags/tag_img.asp)
- [CSS图片样式教程](https://www.w3schools.com/css/css3_images.asp)
- [图片优化工具](https://tinypng.com/)

或者联系网站创建者杨钢寻求帮助。