//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// Copyright 2016 Jonathan Santos (santojon)                                //
//                                                                          //
// Licensed under the Apache License, Version 2.0 (the "License");          //
// you may not use this file except in compliance with the License.         //
// You may obtain a copy of the License at                                  //
//                                                                          //
// http://www.apache.org/licenses/LICENSE-2.0                               //
//                                                                          //
// or in file 'LICENSE.txt' on roort of this project.                       //
//                                                                          //
// Unless required by applicable law or agreed to in writing, software      //
// distributed under the License is distributed on an "AS IS" BASIS,        //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. //
// See the License for the specific language governing permissions and      //
// limitations under the License.                                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////


/**
 * Dogefy is a manner to make your DOM bark!
 * @param elem: the element to dogefy.
 * @param options: the doge properties to set.
 * @return: a new Doge object.
 */
function Dogefy(elem, options) {
	// this instance
	var doge = this;

	// the element to dogefy
	var elem = elem;

	// the many barks interval (if exists)
	var interval;

	// the options setted by user
	var userOptions = options;

	// an empty function
	var noop = function() {};

	// the last doge bark
	var lastBark;

	// the last used color in a bark
	var lastColor;

	// the position of the dogefied element
	var pos = elem.getBoundingClientRect();

	// the doge properties setted as default
	var defaultOptions = {
		fullWords: [
			'wow', 'amaze', 'cool', 'exite', '/10', 'oh my doge', 'helvetica',
			'awesome', 'great', 'swag'
		],
		firstWords: [
			'such', 'so', 'very', 'many', 'want', 'need', 'plz', 'go', 'yes'
		],
		lastWords: [
			'dangerous', 'code', 'bark', 'doge', 'dogefy', 'generate', 'clear',
			'full', 'cute', 'word', 'sit', 'free', 'design', 'txt', 'phrase',
			'master', 'layout', 'coin', 'clone', 'meme', 'colorfull', 'random',
			'fun', 'pixel', 'prorotype', 'meta'
		],
		colors: [
			'red', 'yellow', 'green', 'blue', 'purple', 'orange', 'gray', 'aqua',
			'aquamarine', 'chartreuse', 'coral', 'cyan', 'crimson', 'darkgreen',
			'darkorange', 'darkorchid', 'deeppink', 'darkviolet', 'forestgreen',
			'dodgerblue', 'gold', 'fuchsia', 'yellowgreen', 'hotpink', 'lawnGreen',
			'lime', 'tomato', 'turquoise', 'black', 'white', 'dimgray', 'orangered'
		],
		sizes: ['medium'],
		fonts: ['Helvetica'],
		barkInterval: 0,
		barkOn: undefined,
		manyBarkOn: undefined,
		clearOn: undefined,
		barkWhen: noop,
		barkDelay: 0,
		barkFrom: undefined,
		manyBarkWhen: noop,
		manyBarkFrom: undefined,
		barkDuration: 10000,
		clearFrom: undefined,
		clearWhen: noop,
	};
	var options = defaultOptions;

	/**
	 * The full doge definition. All exposed functions.
	 * This is what will be returned to the user.
	 */
	doge.prototype = {
		/**
		 * Function responsible to setup doge.
		 * @return: the doge, initialized.
		 */
		init: function() {
			// set options
			if (userOptions) {
				options = {
					fullWords: userOptions.fullWords || defaultOptions.fullWords,
					firstWords: userOptions.firstWords || defaultOptions.firstWords,
					lastWords: userOptions.lastWords || defaultOptions.lastWords,
					colors: userOptions.colors || defaultOptions.colors,
					barkInterval: userOptions.barkInterval || defaultOptions.barkInterval,
					barkOn: userOptions.barkOn || defaultOptions.barkOn,
					barkWhen: userOptions.barkWhen || defaultOptions.barkWhen,
					barkDelay: userOptions.barkDelay || defaultOptions.barkDelay,
					barkFrom: userOptions.barkFrom || defaultOptions.barkFrom,
					manyBarkWhen: userOptions.manyBarkWhen || defaultOptions.manyBarkWhen,
					manyBarkFrom: userOptions.manyBarkFrom || defaultOptions.manyBarkFrom,
					barkDuration: userOptions.barkDuration || defaultOptions.barkDuration,
					clearWhen: userOptions.clearWhen || defaultOptions.clearWhen,
					clearFrom: userOptions.clearFrom || defaultOptions.clearFrom,
					manyBarkOn: userOptions.manyBarkOn || defaultOptions.manyBarkOn,
					clearOn: userOptions.clearOn || defaultOptions.clearOn,
					sizes: userOptions.sizes || defaultOptions.sizes,
					fonts: userOptions.fonts || defaultOptions.fonts
				};
			}

			// set bark triggers
			if (options.barkWhen) {
				options.barkWhen(bark);
			}

			if (options.barkFrom) {
				options.barkFrom.addEventListener('click', function() {
					bark();
				});
			}

			// set clear triggers
			if (options.clearWhen) {
				options.clearWhen(clearBarks);
			}

			if (options.clearFrom) {
				options.clearFrom.addEventListener('click', function() {
					clearBarks();
				});
			}

			// if have interval, set many barks triggers
			if (options.barkInterval > 0) {
				if (options.manyBarkWhen) {
					options.manyBarkWhen(manyBark);
				}

				if (options.manyBarkFrom) {
					options.manyBarkFrom.addEventListener('click', function() {
						manyBark();
					});
				}
			}

			// set default events
			if (options.barkOn) {
				if (options.barkOn instanceof Array) {
					for (var i = 0; i < options.barkOn.length; i++) {
						elem.addEventListener(options.barkOn[i], function() {
							bark();
						});
					}
				} else {
					elem.addEventListener(options.barkOn, function() {
						bark();
					});
				}
			}

			if (options.manyBarkOn) {
				if (options.manyBarkOn instanceof Array) {
					for (var i = 0; i < options.manyBarkOn.length; i++) {
						elem.addEventListener(options.manyBarkOn[i], function() {
							manyBark();
						});
					}
				} else {
					elem.addEventListener(options.manyBarkOn, function() {
						manyBark();
					});
				}
			}

			if (options.clearOn) {
				if (options.clearOn instanceof Array) {
					for (var i = 0; i < options.clearOn.length; i++) {
						elem.addEventListener(options.clearOn[i], function() {
							clearBarks();
						});
					}
				} else {
					elem.addEventListener(options.clearOn, function() {
						clearBarks();
					});
				}
			}

			return this;
		},
		/**
		 * Main function of doge. Make it barks.
		 * Call it on $your_doge.bark();.
		 * It ill respond with a doge phrase.
		 */
		bark: function() {
			bark();
		},
		/**
		 * Main function of doge for repeated barks. Make it barks a lot.
		 * Call it on $your_doge.manyBark();
		 * It ill respond with a bunch of doge phrases.
		 */
		manyBark: function() {
			manyBark();
		},
		/**
		 * Set value of any existent property of doge.
		 * @param prop: the property to change.
		 * @param val: the value(s) to set.
		 * @return: the doge, modified.
		 */
		set: function(prop, val) {
			if (listPropNames(prop)) {
				if (val instanceof Array) {
					options[prop] = val;
				} else {
					options[prop] = [val];
				}
			} else if (propNames(prop)) {
				options[prop] = val;
			}

			return this;
		},
		/**
		 * Put values on any existent list property of doge.
		 * @param prop: the property to change.
		 * @param val: the value(s) to put.
		 * @return: the doge, modified.
		 */
		put: function(prop, val) {
			if (listPropNames(prop)) {
				if (val instanceof Array) {
					for (var i = 0; i < val.length; i++) {
						options[prop].push(val[i]);
					}
				} else {
					options[prop].push(val);
				}
			}

			return this;
		},
		/**
		 * Clear many barks to make all more clear.
		 */
		clearBarks: function() {
			clearBarks();
		},
		/**
		 * Reset doge to original values.
		 * This can be used to reset an previously initialized doge.
		 * @param prop: the property to set defaults.
		 * @return: the doge, reseted.
		 */
		defaults: function(prop) {
			if (prop) {
				options[prop] = defaultOptions[prop];
			} else {
				var props = propNames();
				for (var i = 0; i < props.length; i++) {
					options[props[i]] = defaultOptions[props[i]];
				}
			}

			return this;
		},
		/**
		 * Reset doge to original user values.
		 * This can be used to reset an previously initialized doge.
		 * @param prop: the property to set defaults.
		 * @return: the doge, reseted.
		 */
		userDefaults: function(prop) {
			if (prop) {
				options[prop] = userOptions[prop];
			} else {
				var props = propNames();
				for (var i = 0; i < props.length; i++) {
					options[props[i]] = userOptions[props[i]];
				}
			}

			return this;
		}
	};




	/**
	 * --------------------------------------------------------------------------
	 * BASIC METHODS
	 * --------------------------------------------------------------------------
	 */



	/**
	 * The voice of doge.
	 */
	var bark = function(many) {
		// get text from options
		var x = randomInt(0, 12);
		var fst = options.firstWords[randomInt(0, options.firstWords.length - 1)];
		var lst = options.lastWords[randomInt(0, options.lastWords.length - 1)];
		var phrase = fst + ' ' + lst;

		var sng = options.fullWords[randomInt(0, options.fullWords.length - 1)];
		sng = sng !== '/10' ? sng : x + sng;

		var theBark = randomInt(0,1) === 0 ? sng : phrase;

		// to avoid repeated barks in a row
		if (lastBark) {
			if (lastBark === theBark) {
				bark();
			}
		} else {
			lastBark = theBark;
		}

		// create a div to append on doge
		var d = document.createElement('div');
		var b = document.createElement('b');
		var t = document.createTextNode(theBark);
		d.appendChild(b);
		b.appendChild(t);

		// format it to show
		d = formatNode(d);

		// if many, don't use single bark delay
		if (many) {
			elem.appendChild(d);
			fixBounds(d);
			// gets the duration of the bark from options (the default is '10000')
			if (options.barkDuration > 0) {
				setTimeout(function() {
					d.style.display = 'none';
				}, options.barkDuration);
			}
		} else {
			// gets the timeout from options (the default is '0')
			setTimeout(function() {
				elem.appendChild(d);
				fixBounds(d);
				// gets the duration of the bark from options (the default is '10000')
				if (options.barkDuration > 0) {
					setTimeout(function() {
						d.style.display = 'none';
					}, options.barkDuration);
				}
			}, options.barkDelay);
		}
	};

	/**
	 * What doge do when exited or in rage.
	 */
	var manyBark = function() {
		if (options.barkInterval) {
			// clear interval if exists
			if (interval) {
				clearInterval(interval);
				interval = undefined;

			// otherwise, create a new one
			} else {
				interval = setInterval(function() {
					bark('many');
				}, options.barkInterval);
			}
		}
	}

	/**
	 * Clear all the barks possible to get.
	 */
	var clearBarks = function() {
		var p = document.getElementsByClassName('phrase');
		for (var i = 0; i < p.length; i++) {
			p[i].parentNode.removeChild(p[i]);
		}
	}


	

	/**
	 * --------------------------------------------------------------------------
	 * AUXILIAR METHODS
	 * --------------------------------------------------------------------------
	 */



	 /**
	 * Formats the doge phrase to show.
	 * @param node: the node to format.
	 * @return: the same node, formatted.
	 */
	var formatNode = function(node) {
		// the color to set
		var theColor = options.colors[randomInt(0, options.colors.length - 1)];

		// to avoid repeated colors in a row
		if (lastColor) {
			while (lastColor === theColor) {
				theColor = options.colors[randomInt(0, options.colors.length - 1)];
			}
			lastColor = theColor;
		} else {
			lastColor = theColor;
		}

		node.className = 'phrase';
		var css = {
			color: theColor,
			position: 'absolute',
			fontSize: options.sizes[randomInt(0, options.sizes.length - 1)] + 'px',
			fontFamily:  options.fonts[randomInt(0, options.fonts.length - 1)],
			top: randomInt(pos.top, pos.bottom) + 'px',
			left: randomInt(pos.left, pos.right) + 'px'
		};

		// apply css style
		applyStyle(css, node);

		return node;
	}

	/**
	 * Fix position of a bark recently drawed in screen.
	 * @param node: the doge phrase to fix positioning.
	 */
	var fixBounds = function(node) {
		var css = {
			top: randomInt(pos.top, pos.bottom - node.clientHeight) + 'px',
			left: randomInt(pos.left, pos.right - node.clientWidth) + 'px'
		};
		applyStyle(css, node);
	}

	/**
	 * Apply a css style to a given node.
	 * @param css: the style to be applyed.
	 * @param node: the element to apply style.
	 */
	var applyStyle = function(css, node) {
		for(i in css){
		   node.style[i] = css[i];
		}
	}

	/**
	 * Auxiliar method to randomize doge barks and things.
	 * @param min: the min value.
	 * @param max: the max value.
	 * @return: a random int in (min, max) range.
	 */
	var randomInt = function (min, max) {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	};

	/**
	 * The names of all doge properties.
	 * @return: all the properties names.
	 */
	var propNames = function() {
		return [
			'fullWords', 'firstWords', 'lastWords', 'colors', 'barkInterval',
			'barkOn', 'barkWhen', 'barkDelay', 'barkFrom', 'barkDuration',
			'manyBarkOn', 'manyBarkWhen', 'manyBarkFrom', 'clearOn', 'clearWhen',
			'clearFrom', 'fonts', 'sizes'
		];
	};

	/**
	 * The names of all doge list properties.
	 * @return: all the list names.
	 */
	var listPropNames = function() {
		return [
			'fullWords', 'firstWords', 'lastWords', 'colors', 'barkOn', 'clearOn',
			'manyBarkOn', 'fonts', 'sizes'
		];
	};

	/**
	 * Auxiliar method to verify if value exists in list.
	 * @param val: the value to test.
	 * @param lst: the list to search.
	 * @return: true if exists, false otherwise.
	 */
	var inLinst = function(val, lst) {
		return lst.indexOf(val) > -1;
	};

	/**
	 * Auxiliar method to verify if value exists in doge properties.
	 * @param prop: the property to test.
	 * @return: true if exists, false otherwise.
	 */
	var existsProp = function(prop) {
		return inLinst(prop, propNames());
	};

	/**
	 * Auxiliar method to verify if value exists in list properties of doge.
	 * @param prop: the property to test.
	 * @return: true if exists, false otherwise.
	 */
	var existsListProp = function (prop) {
		return inLinst(prop, listPropNames());
	};

	// return the Doge object
	return doge.prototype;
}

/**
 * Needed to make any element a doge with $elem.dogefy();.
 * Make sure the $elem is really a DOM Node.
 * With this, we can dogefy any element in the screen as default.
 * @return: dogefy() will return an initialized doge.
 */
(function() {
	Node.prototype.dogefy = function(options) {
		return new Dogefy(this, options).init();
	}
})();
