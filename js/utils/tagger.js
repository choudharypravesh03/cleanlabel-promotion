/**@license
 *  _____
 * |_   _|___ ___ ___ ___ ___
 *   | | | .'| . | . | -_|  _|
 *   |_| |__,|_  |_  |___|_|
 *           |___|___|   version 0.2.1
 *
 * Tagger - Vanilla JavaScript Tag Editor
 *
 * Copyright (c) 2018-2020 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 */
/* global define, module, global */
(function(root, factory, undefined) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.tagger = factory();
    }
})(typeof window !== 'undefined' ? window : global, function(undefined) {
    // ------------------------------------------------------------------------------------------
    var get_text = (function() {
        var div = document.createElement('div');
        var text = ('innerText' in div) ? 'innerText' : 'textContent';
        return function(element) {
            return element[text];
        };
    })();
    // ------------------------------------------------------------------------------------------
    function tagger(input, options) {
        if (input.length) {
            return Array.from(input).map(function(input) {
                return new tagger(input, options);
            });
        }
        if (!(this instanceof tagger)) {
            return new tagger(input, options);
        }
        var settings = merge({}, tagger.defaults, options);
        this.init(input, settings);
    }
    // ------------------------------------------------------------------------------------------
    function merge() {
        if (arguments.length < 2) {
            return arguments[0];
        }
        var target = arguments[0];
        [].slice.call(arguments).reduce(function(acc, obj) {
            if (is_object(obj)) {
                Object.keys(obj).forEach(function(key) {
                    if (is_object(obj[key])) {
                        if (is_object(acc[key])) {
                            acc[key] = merge({}, acc[key], obj[key]);
                            return;
                        }
                    }
                    acc[key] = obj[key];
                });
            }
            return acc;
        });
        return target;
    }
    // ------------------------------------------------------------------------------------------
    function is_object(arg) {
        if (typeof arg !== 'object' || arg === null) {
            return false;
        }
        return Object.prototype.toString.call(arg) === '[object Object]';
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    // ------------------------------------------------------------------------------------------
    function create(tag, attrs, children) {
        tag = document.createElement(tag);
        Object.keys(attrs).forEach(function(name) {
            if (name === 'style') {
                Object.keys(attrs.style).forEach(function(name) {
                    tag.style[name] = attrs.style[name];
                });
            } else {
                tag.setAttribute(name, attrs[name]);
            }
        });
        if (children !== undefined) {
            children.forEach(function(child) {
                var node;
                if (typeof child === 'string') {
                    node = document.createTextNode(child);
                } else {
                    node = create.apply(null, child);
                }
                tag.appendChild(node);
            });
        }
        return tag;
    }
    var id = 0;
    // ------------------------------------------------------------------------------------------
    tagger.defaults = {
        allow_duplicates: false,
        allow_spaces: true,
        completion: {
            list: [],
            delay: 400,
            min_length: 2
        },
        link: function(name) {
            return '/tag/' + name;
        }
    };
    // ------------------------------------------------------------------------------------------
    tagger.fn = tagger.prototype = {
        init: function(input, settings) {
            this._id = ++id;
            var self = this;
            this._settings = settings;
            this._ul = document.createElement('ul');
            this._input = input;
            var wrapper = document.createElement('div');
            wrapper.className = 'tagger';
            this._input.setAttribute('hidden', 'hidden');
            this._input.setAttribute('type', 'hidden');
            var li = document.createElement('li');
            li.className = 'tagger-new';
            this._new_input_tag = document.createElement('input');
            this.tags_from_input();
            li.appendChild(this._new_input_tag);
            this._completion = document.createElement('div');
            this._completion.className = 'tagger-completion';
            this._ul.appendChild(li);
            input.parentNode.replaceChild(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(this._ul);
            li.appendChild(this._completion);
            this._add_events();
            if (this._settings.completion.list instanceof Array) {
                this._build_completion(this._settings.completion.list);
            }
        },
        // --------------------------------------------------------------------------------------
        _add_events: function() {
            var self = this;
            this._ul.addEventListener('click', function(event) {
                if (event.target.className.match(/close/)) {
                    self.remove_tag(event.target);
                    event.preventDefault();
                }
            });
            // ----------------------------------------------------------------------------------
            this._new_input_tag.addEventListener('keydown', function(event) {
                if (event.keyCode === 13 || event.keyCode === 188 ||
                    (event.keyCode === 32 && !self._settings.allow_spaces)) { // enter || comma || space
                    if(validateEmail(self._new_input_tag.value)) {
                        console.log("VALID");
                        self.add_tag(self._new_input_tag.value.trim());
                        self._new_input_tag.value = '';
                    } else {
                        alert('Please enter a valid email address');
                    }
                    event.preventDefault();
                } else if (event.keyCode === 8 && !self._new_input_tag.value) { // backspace
                    if (self._tags.length > 0) {
                        var li = self._ul.querySelector('li:nth-last-child(2)');
                        self._ul.removeChild(li);
                        self._tags.pop();
                    }
                    event.preventDefault();
                } else if (event.keyCode === 32 && (event.ctrlKey || event.metaKey)) {
                    if (typeof self._settings.completion.list === 'function') {
                        self.complete(self._new_input_tag.value);
                    }
                    self._toggle_completion(true);
                    event.preventDefault();
                }
            });
            // ----------------------------------------------------------------------------------
            this._new_input_tag.addEventListener('input', function(event) {
                var value = self._new_input_tag.value;
                if (self._tag_selected(value)) {
                    if (self.add_tag(value)) {
                        self._toggle_completion(false);
                        self._new_input_tag.value = '';
                    }
                } else {
                    if (typeof self._settings.completion.list === 'function') {
                        self.complete(value);
                    }
                    var min = self._settings.completion.min_length;
                    self._toggle_completion(value.length >= min);
                }
            });
            // ----------------------------------------------------------------------------------
            this._completion.addEventListener('click', function(event) {
                if (event.target.tagName.toLowerCase() === 'a') {
                    self.add_tag(get_text(event.target));
                    self._new_input_tag.value = '';
                    self._completion.innerHTML = '';
                }
            });
        },
        // --------------------------------------------------------------------------------------
        _tag_selected: function(tag) {
            return this._last_completion && this._last_completion.includes(tag);
        },
        // --------------------------------------------------------------------------------------
        _toggle_completion: function(toggle) {
            if (toggle) {
                this._new_input_tag.setAttribute('list', 'tagger-completion-' + this._id);
            } else {
                this._new_input_tag.removeAttribute('list');
            }
        },
        // --------------------------------------------------------------------------------------
        _build_completion: function(list) {
            this._completion.innerHTML = '';
            this._last_completion = list;
            if (list.length) {
                var id = 'tagger-completion-' + this._id;
                var datalist = create('datalist', {id: id}, list.map(function(tag) {
                    return ['option', {}, [tag]];
                }));
                this._completion.appendChild(datalist);
            }
        },
        // --------------------------------------------------------------------------------------
        complete: function(value) {
            if (this._settings.completion) {
                var list = this._settings.completion.list;
                if (typeof list === 'function') {
                    var ret = list(value);
                    if (ret && typeof ret.then === 'function') {
                        ret.then(this._build_completion.bind(this));
                    } else if (ret instanceof Array) {
                        this._build_completion(ret);
                    }
                } else {
                    this._build_completion(list);
                }
            }
        },
        // --------------------------------------------------------------------------------------
        tags_from_input: function() {
            this._tags = this._input.value.split(/\s*,\s*/).filter(Boolean);
            this._tags.forEach(this._new_tag.bind(this));
        },
        // --------------------------------------------------------------------------------------
        _new_tag: function(name) {
            var close = ['a', {href: '#', 'class': 'close'}, ['\u00D7']];
            var label = ['span', {'class': 'label'}, [name]]
            var href = this._settings.link(name);
            var li;
            if (href === false) {
                li = create('li', {}, [['span', {}, [label, close]]]);
            } else {
                var a_atts = {href: href, target: '_black'};
                li = create('li', {}, [['a', a_atts, [label, close]]]);
            }
            this._ul.insertBefore(li, this._new_input_tag.parentNode);
        },
        // --------------------------------------------------------------------------------------
        add_tag: function(name) {
            if (!this._settings.allow_duplicates && this._tags.indexOf(name) !== -1) {
                return false;
            }
            this._new_tag(name)
            this._tags.push(name);
            this._input.value = this._tags.join(', ');
            return true;
        },
        // --------------------------------------------------------------------------------------
        remove_tag: function(close) {
            console.log(close);
            var li = close.closest('li');
            var name = li.querySelector('.label').innerText;
            this._ul.removeChild(li);
            this._tags = this._tags.filter(function(tag) {
                return name !== tag;
            });
            this._input.value = this._tags.join(', ');
        }
    };
    // ------------------------------------------------------------------------------------------
    return tagger;
});
