

/**************
* Middle Grid *
**************/

var MiddleGrid = function(mosaic, images, startAlpha, endAlpha) {
  this.mosaic = mosaic;
  this.images = images;
  this.startAlpha = startAlpha;
  this.endAlpha = endAlpha;
};

MiddleGrid.prototype = {
  draw: function() {
    var bounds = this.getDrawBounds();
    for(var c = bounds.left; c < bounds.right; c++){
      for(var r = bounds.top; r < bounds.bottom; r++) {
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

  getDrawBounds: function() {
    var bounds = {
      left: 0,
      right: this.mosaic.cols,
      top: 0,
      bottom: this.mosaic.rows
    };

    var w = this.getW();
    var h = this.getH();

    var left = this.getX(0);
    var right = this.getX(this.mosaic.cols-1) + w;
    var top = this.getY(0);
    var bottom = this.getY(this.mosaic.rows-1) + h;

    if(left < 0) {
      bounds.left = Math.floor(-left / w);
    }

    if(top < 0){
      bounds.top = Math.floor(-top / h);
    }

    if(right > this.mosaic.width) {
      right -= this.mosaic.width;
      right = Math.floor(right / w);
      bounds.right -= right;
    }

    if(bottom > this.mosaic.height) {
      bottom -= this.mosaic.height;
      bottom = Math.floor(bottom / h);
      bounds.bottom -= bottom;
    }

    return bounds;
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
