# inquartik.interview.front-end

進入網站後，可以透過上方的 Home, Add 兩個連結按鈕，抵達首頁及新增頁面

新增頁面的 Price 只能輸入**數字**，Note 是透過**換行**判定多個選項
- - -
首頁的 Checkbox 可以記錄已完成的 Note

點擊 Edit 按鈕可編輯該筆資料，邏輯與新增相同

點擊 Delete 則刪除該筆資料
- - -
列表表頭 Name 及 Price 可點擊不同的箭頭 Icon 針對不同的 Field 做 Desc, Asc 排序，其中 Name 的排序使用 localeCompare 方法

所有列表的資料變動皆儲存在 LocalStorage


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
