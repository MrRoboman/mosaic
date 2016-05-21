var Mosaic = function(options) {
  this.canvasId = options.canvasId;
  this.imageUrls = options.imageUrls || [];
  this.width = options.width || 640;
  this.height = options.height || 640;
  this.setRowsCols(options.rows, options.cols);
  this.scale = 1;
  this.playing = false;

  this.initCanvas();
  this.initImages();

  this.middleGrid = this.getRandomImages();

  this.play();
};

Mosaic.prototype = {

  initCanvas: function() {
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
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

  totalCells: function() {
    return this.cols * this.rows;
  },

  resize: function() {
    if(this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  },

  update: function() {
    this.scale += .001;
    this.drawMiddleGrid();
    if(this.playing) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  },

  getRandomElement: function(arr) {
    var r = Math.floor(Math.random() * arr.length);
    return arr[r];
  },

  drawMiddleGrid: function() {
    for(var i = 0; i < this.middleGrid.length; i++){
      var img = this.middleGrid[i];
      var x = this.getMiddleGridX(i);
      var y = this.getMiddleGridY(i);
      var w = this.getMiddleGridW();
      var h = this.getMiddleGridH();
      this.ctx.drawImage(img, x, y, w, h);
    }
  },

  getMiddleGridX: function(idx) {
    return this.width / this.cols * this.getGridX(idx);
  },

  getMiddleGridY: function(idx) {
    return this.height / this.rows * this.getGridY(idx);
  },

  getMiddleGridW: function() {
    return this.width / this.cols;
  },

  getMiddleGridH: function() {
    return this.height / this.rows;
  },

  getGridX: function(idx) {
    return idx % this.cols;
  },

  getGridY: function(idx) {
    return Math.floor(idx / this.rows);
  }
};
