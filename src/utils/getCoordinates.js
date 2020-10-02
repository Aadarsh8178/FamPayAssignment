//Returns the relative coordinate of an element to the body

const getCoordinates = (obj) => {
  var p = {};
  p.x = obj.offsetLeft;
  p.y = obj.offsetTop;
  while (obj.offsetParent) {
    p.x = p.x + obj.offsetParent.offsetLeft;
    p.y = p.y + obj.offsetParent.offsetTop;
    if (obj === document.getElementsByTagName("body")[0]) {
      break;
    } else {
      obj = obj.offsetParent;
    }
  }
  return p;
};

export default getCoordinates;
