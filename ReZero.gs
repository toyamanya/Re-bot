// main関数
function main(){
  const cell_A1 = SpreadsheetApp.getActiveSheet().getRange("A1");
  const LatestPageNum = cell_A1.getValue();
  
  if (checkNewPageExist(LatestPageNum + 1)) {
    PostNewTitle()
    cell_A1.setValue(LatestPageNum + 1);
  }
}


// Trelloにリゼロの新着通知
function PostNewTitle(){
  const scriptProp = PropertiesService.getScriptProperties().getProperties();
  const trelloKey = scriptProp.TRELLO_API_KEY;
  const trelloToken = scriptProp.TRELLO_TOKEN;
  const userName = scriptProp.TRELLO_USERNAME;
  // 今日のTodoに追加
  const listId = "5d5cd47d572d9b4d075b5431";
  
  const url = "https://api.trello.com/1/lists/" + listId + "/cards?key=" + trelloKey + "&token=" + trelloToken + "&name=リゼロの最新話が更新されました";
  response = UrlFetchApp.fetch(url, {"method":"post"});
}


// 対象ページが存在するかをチェック.存在すればtrueを返す
function checkNewPageExist(pageNum) {
  try {
    var html = UrlFetchApp.fetch("https://ncode.syosetu.com/n2267be/" + pageNum + "/", {"method":"get"});
    return true;
  } catch(e) {
    return false;
  }
}

