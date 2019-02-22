
var Json2Map = function (json, map) {
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      map.set(key, json[key]);
    }
  }
}
/**
 * @description json对象转换为Map
 */
window.Json2Map = Json2Map;

