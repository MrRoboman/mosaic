var Mosaic = function(options) {
  this.canvasId = options.canvasId;
  this.imageUrls = options.imageUrls || [];
  this.fullscreen = options.fullscreen || false;
  this.width = options.width || 640;
  this.height = options.height || 640;
  this.setRowsCols(options.rows, options.cols);
  this.selectedIdx = 1;
  this.scale = 1;
  this.playing = false;

  this.initCanvas();
  this.initImages();

  // this.middleGrid = this.getRandomImages();
  this.middleGrid = new MiddleGrid(this, this.getRandomImages(), 0, 1);

  this.play();
};

Mosaic.prototype = {

  dismount: function() {
    this.stop();
    this.canvas.removeEventListener('click', this.onClickCanvas.bind(this));

    this.canvas = null;
    this.ctx = null;
    this.imageUrls = null;
    this.images = null;
    this.middleGrid = null;
  },

  initCanvas: function() {
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    this.canvas.addEventListener('click', this.onClickCanvas.bind(this));
  },

  initImages: function() {
    this.images = [];
    this.imageUrls.forEach(function(imgUrl){
      var img = new Image();
      img.loadAlpha = 0;
      img.onload = this.onImageLoad;
      img.src = imgUrl;
      this.images.push(img);
    }.bind(this));
  },

  onImageLoad: function(e) {
    this.loadAlpha = 1;
  },

  onClickCanvas: function(e) {

  },

  play: function() {
    this.playing = true;
    window.requestAnimationFrame(this.update.bind(this));
  },

  stop: function() {
    this.playing = false;
  },

  getRandomImages: function() {
    var images = [];
    for(var i = 0; i < this.totalCells; i++){
      images.push(this.getRandomElement(this.images));
    }
    return images;
  },

  setRowsCols: function(rows, cols) {
    this.rows = rows || 10;
    this.cols = cols || 10;
    this.totalCells = rows * cols;
  },

  resize: function() {
    if(this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  },

  update: function() {
    if(this.playing) {
      if(this.scale < this.cols){
        this.scale += .01;
      }
      this.clear();
      this.middleGrid.draw();
      window.requestAnimationFrame(this.update.bind(this));
    }
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  draw: function(img, x, y, w, h, alpha){
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(img, x, y, w, h);
    this.ctx.globalAlpha = 1;
  },

  getScaleProgress: function() {
    return (this.scale-1) / (this.cols-1);
  },

  getRandomElement: function(arr) {
    var r = Math.floor(Math.random() * arr.length);
    return arr[r];
  },

  getCellX: function(idx) {
    return idx % this.cols;
  },

  getCellY: function(idx) {
    return Math.floor(idx / this.rows);
  }
};
