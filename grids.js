
var MiddleGrid = function(mosaic, images, startAlpha, endAlpha) {
  this.mosaic = mosaic;
  this.images = images;
  this.startAlpha = startAlpha;
  this.endAlpha = endAlpha;
};

MiddleGrid.prototype = {
  draw: function() {
    for(var c = 0; c < this.mosaic.cols; c++){
      for(var r = 0; r < this.mosaic.rows; r++) {
        var img = this.images[c][r];
        var x = this.getX(c);
        var y = this.getY(r);
        var w = this.getW();
        var h = this.getH();
        var a = this.getAlpha() * img.loadAlpha;
        this.mosaic.draw(img, x, y, w, h, a);
      }
    }
  },

  getAlpha: function() {
    var alphaRange = this.endAlpha - this.startAlpha;
    return alphaRange * this.mosaic.getScaleProgress() + this.startAlpha;
  },

  offsetX: function(cellX) {
    return -this.mosaic.width * cellX * this.mosaic.getScaleProgress();
  },

  offsetY: function(cellY) {
    return -this.mosaic.height * cellY * this.mosaic.getScaleProgress();
  },

  getX: function(cellX) {
    return this.mosaic.width / this.mosaic.cols * cellX * this.mosaic.scale + this.offsetX(this.mosaic.selectedCell.x);
  },

  getY: function(cellY) {
    return this.mosaic.height / this.mosaic.rows * cellY * this.mosaic.scale + this.offsetY(this.mosaic.selectedCell.y);
  },

  getW: function() {
    return this.mosaic.width / this.mosaic.cols * this.mosaic.scale;
  },

  getH: function() {
    return this.mosaic.height / this.mosaic.rows * this.mosaic.scale;
  }
};
