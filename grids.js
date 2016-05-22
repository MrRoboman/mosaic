var MiddleGrid = function(mosaic, images, startAlpha, endAlpha) {
  this.mosaic = mosaic;
  this.images = images;
  this.startAlpha = startAlpha;
  this.endAlpha = endAlpha;
};

MiddleGrid.prototype = {
  draw: function() {
    for(var i = 0; i < this.images.length; i++){
      var img = this.images[i];
      var x = this.getX(i);
      var y = this.getY(i);
      var w = this.getW();
      var h = this.getH();
      var a = this.getAlpha() * img.loadAlpha;
      this.mosaic.draw(img, x, y, w, h, a);
    }
  },

  getAlpha: function() {
    var alphaRange = this.endAlpha - this.startAlpha;
    return alphaRange * this.mosaic.getScaleProgress() + this.startAlpha;
  },

  offsetX: function(idx) {
    idx = this.mosaic.getCellX(idx);
    return -this.mosaic.width * idx * this.mosaic.getScaleProgress();
  },

  offsetY: function(idx) {
    idx = this.mosaic.getCellY(idx);
    return -this.mosaic.height * idx * this.mosaic.getScaleProgress();
  },

  getX: function(idx) {
    return this.mosaic.width / this.mosaic.cols * this.mosaic.getCellX(idx) * this.mosaic.scale + this.offsetX(this.mosaic.selectedIdx);
  },

  getY: function(idx) {
    return this.mosaic.height / this.mosaic.rows * this.mosaic.getCellY(idx) * this.mosaic.scale + this.offsetY(this.mosaic.selectedIdx);
  },

  getW: function() {
    return this.mosaic.width / this.mosaic.cols * this.mosaic.scale;
  },

  getH: function() {
    return this.mosaic.height / this.mosaic.rows * this.mosaic.scale;
  }
};
