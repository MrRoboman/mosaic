
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

        //Middle
        var img = this.images[c][r];
        var x = this.getX(c);
        var y = this.getY(r);
        var w = this.getW();
        var h = this.getH();
        var a = this.getAlpha() * img.loadAlpha;
        // this.mosaic.draw(img, x, y, w, h, a);

        //Small
        var smBounds = this.getSmallDrawBounds(c, r);
        for(var smC = smBounds.left; smC < smBounds.right; smC++){
          for(var smR = smBounds.top; smR < smBounds.bottom; smR++){
            img = this.images[smC][smR];
            x = this.getSmallX(c, smC);
            y = this.getSmallY(r, smR);
            w = this.getSmallW();
            h = this.getSmallH();
            a = this.getSmallAlpha() * img.loadAlpha; a = 1
            this.mosaic.draw(img, x, y, w, h, a);
          }
        }
      }
    }
  },



  //Small

  getSmallAlpha: function() {
    var alphaRange = this.startAlpha;
    return alphaRange * this.mosaic.getScaleProgress();
  },

  getSmallDrawBounds: function(col, row) {
    // x y indices
    var bounds = {
      left: 0,
      right: this.mosaic.cols,
      top: 0,
      bottom: this.mosaic.rows
    };

    var w = this.getSmallW();
    var h = this.getSmallH();

    var left = this.getSmallX(col,0);
    var right = this.getSmallX(col, this.mosaic.cols-1) + w;
    var top = this.getSmallY(row, 0);
    var bottom = this.getSmallY(row, this.mosaic.rows-1) + h;

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

  // offsetX: function(cellX) {
  //   return -this.mosaic.width * cellX * this.mosaic.getScaleProgress();
  // },
  //
  // offsetY: function(cellY) {
  //   return -this.mosaic.height * cellY * this.mosaic.getScaleProgress();
  // },

  getSmallX: function(cellX, smallCellX) {
    var middleCellX = this.mosaic.width / this.mosaic.cols * cellX * this.mosaic.scale + this.offsetX(this.mosaic.selectedCell.x);
    return middleCellX + this.getSmallW() * smallCellX;
  },

  getSmallY: function(cellY, smallCellY) {
    var middleCellY = this.getY(cellY);
    return middleCellY + this.getSmallH() * smallCellY;
  },

  getSmallW: function() {
    return this.mosaic.width / this.mosaic.cols / this.mosaic.cols * this.mosaic.scale;
  },

  getSmallH: function() {
    return this.mosaic.height / this.mosaic.rows / this.mosaic.rows * this.mosaic.scale;
  },



  //Middle

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
  },
};
