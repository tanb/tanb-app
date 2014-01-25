// Generated by CoffeeScript 1.6.3
(function() {
  var UI,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $(document).ready(function() {
    window.viewController = new ViewController();
    return window.addSubView(viewController.view);
  });

  UI = window;

  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

  window._subviews = [];

  window.addSubView = function(view) {
    $('body').append(view._$elm);
    return window._subviews.push(view);
  };

  Object.defineProperty(window, 'subviews', {
    get: function() {
      return window._subviews;
    },
    set: function() {}
  });

  UI.View = (function() {
    function View() {
      this._$elm = $('<div />');
      this._$elm.addClass(this.constructor.name);
      this._subviews = [];
    }

    View.property('frame', {
      get: function() {
        var frame;
        frame = {
          width: this._$elm.width(),
          height: this._$elm.height()
        };
        return frame;
      },
      set: function(frame) {
        this._$elm.width(frame.width);
        return this._$elm.height(frame.height);
      }
    });

    View.prototype.addSubView = function(view) {
      this._$elm.append(view._$elm);
      return this._subviews.push(view);
    };

    View.property('subviews', {
      get: function() {
        return this._subviews;
      },
      set: function() {}
    });

    return View;

  })();

  UI.CustomView = (function(_super) {
    __extends(CustomView, _super);

    function CustomView() {
      CustomView.__super__.constructor.apply(this, arguments);
    }

    return CustomView;

  })(UI.View);

  UI.ViewController = (function() {
    function ViewController() {
      this._view = null;
    }

    ViewController.property('view', {
      get: function() {
        if (this._view) {
          return this._view;
        }
        this.loadView();
        this.viewDidLoad();
        return this._view;
      },
      set: function(view) {
        return this._view = view;
      }
    });

    ViewController.prototype.loadView = function() {
      console.log("loadView");
      return this._view = new UI.View();
    };

    ViewController.prototype.viewDidLoad = function() {
      return console.log("viewDidLoad");
    };

    return ViewController;

  })();

}).call(this);
