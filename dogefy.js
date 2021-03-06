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
			'wow', 'amaze', 'cool', 'exite', '/10', 'oh my doge', 'awesome',
			'great', 'swag'
		],
		firstWords: [
			'such', 'so', 'very', 'many', 'want', 'need', 'plz', 'go'
		],
		lastWords: [
			'dangerous', 'code', 'bark', 'doge', 'dogefy', 'generate', 'clear',
			'full', 'cute', 'word', 'sit', 'free', 'design', 'master', 'layout',
			'coin', 'clone', 'meme', 'colorfull', 'random', 'fun', 'pixel',
			'prorotype', 'meta', 'beta'
		],
		colors: [
			'red', 'yellow', 'green', 'blue', 'purple', 'orange', 'gray', 'aqua',
			'aquamarine', 'chartreuse', 'coral', 'cyan', 'crimson', 'darkgreen',
			'darkorange', 'darkorchid', 'deeppink', 'darkviolet', 'forestgreen',
			'dodgerblue', 'gold', 'fuchsia', 'yellowgreen', 'hotpink', 'lawnGreen',
			'lime', 'tomato', 'turquoise', 'black', 'white', 'dimgray', 'orangered'
		],
		sizes: ['medium'],
		fonts: ['Comic Sans MS'],
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
		shadow: false,
		shadowColor: 'black',
		zIndexes: ['999'],
		adaptive: false,
		adaptOn: undefined,
		adaptFrom: undefined,
		adaptWhen: noop,
		clearAllFrom: undefined,
		clearAllOn: undefined,
		clearAllWhen: noop
	};
	var options = defaultOptions;

	/**
	 * The full doge definition. All exposed functions.
	 * This is what will be returned to the user.
	 */
	doge.prototype = {
		/**
		 * Function responsible to setup doge.
		 * @return: the doge, initialised.
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
					fonts: userOptions.fonts || defaultOptions.fonts,
					shadow: userOptions.shadow || defaultOptions.shadow,
					shadowColor: userOptions.shadowColor || defaultOptions.shadowColor,
					zIndexes: userOptions.zIndexes || defaultOptions.zIndexes,
					adaptive: userOptions.adaptive || defaultOptions.adaptive,
					adaptWhen: userOptions.adaptWhen || defaultOptions.adaptWhen,
					adaptOn: userOptions.adaptOn || defaultOptions.adaptOn,
					adaptFrom: userOptions.adaptFrom || defaultOptions.adaptFrom,
					clearAllFrom: userOptions.clearAllFrom || defaultOptions.clearAllFrom,
					clearAllWhen: userOptions.clearAllWhen || defaultOptions.clearAllWhen,
					clearAllOn: userOptions.clearAllOn || defaultOptions.clearAllOn
				};
			}

			// adaptive things
			if (options.adaptive) {
				this.put('fullWords', getAllProcessedText().full);
				this.put('fullWords', options.fonts);
				this.put('firstWords', getAllProcessedText().first);
				this.put('lastWords', getAllProcessedText().last);

				if (options.adaptFrom) {
					options.adaptFrom.addEventListener('click', function() {
						adapt();
					});
				}

				if (options.adaptWhen) {
					options.adaptWhen(adapt);
				}

				if (options.adaptOn) {
					if (options.adaptOn instanceof Array) {
						for (var i = 0; i < options.adaptOn.length; i++) {
							elem.addEventListener(options.adaptOn[i], function() {
								adapt();
							});
						}
					} else {
						elem.addEventListener(options.adaptOn, function() {
							adapt();
						});
					}
				}
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

			// set clear all thiggers
			if (options.clearAllFrom) {
				options.clearAllFrom.addEventListener('click', function() {
					clearAllBarks();
				});
			}

			if (options.clearAllWhen) {
				options.clearAllWhen(clearAllBarks);
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

			if (options.clearAllOn) {
				if (options.clearAllOn instanceof Array) {
					for (var i = 0; i < options.clearAllOn.length; i++) {
						elem.addEventListener(options.clearAllOn[i], function() {
							clearAllBarks();
						});
					}
				} else {
					elem.addEventListener(options.clearAllOn, function() {
						clearAllBarks();
					});
				}
			}

			return this;
		},
		/**
		 * Main function of doge. Make it barks.
		 * Call it on $your_doge.bark();.
		 * It will respond with a doge phrase.
		 */
		bark: function() {
			bark();
		},
		/**
		 * Main function of doge for repeated barks. Make it barks a lot.
		 * Call it on $your_doge.manyBark();
		 * It will respond with a bunch of doge phrases.
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
		 * Make all words list unique valued.
		 * @return: the doge, modified.
		 */
		uniqueWords: function() {
			options.fullWords = uniqueValues(options.fullWords);
			options.firstWords = uniqueValues(options.firstWords);
			options.lastWords = uniqueValues(options.lastWords);

			return this;
		},
		/**
		 * Clear many barks to make all more clear.
		 */
		clearBarks: function() {
			clearBarks();
		},
		/**
		 * Used to clear all barks in screen.
		 */
		clearAllBarks: function() {
			var p = document.getElementsByClassName('phrase');
			for(i = 0; i < p.length; i++) {
				clearBarks();
				if (i === (p.length - 1)) {
					p = document.getElementsByClassName('phrase');
					i = 0;
				}
			}

			// if is not all clear yet
			if (p && p.length > 0) {
				this.clearAllBarks();
			}
		},
		/**
		 * Adapt doge language to this page.
		 */
		adapt: function() {
			this.put('fullWords', getAllProcessedText().full);
			this.put('fullWords', options.fonts);
			this.put('firstWords', getAllProcessedText().first);
			this.put('lastWords', getAllProcessedText().last);

			return this.uniqueWords();
		},
		/**
		 * Reset doge to original values.
		 * This can be used to reset an previously initialised doge.
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
		 * This can be used to reset an previously initialised doge.
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
		},
		/**
		 * Method used to clone doge from its default place to another.
		 * @param el: the element to place new cloned doge.
		 * @return: a new initialised doge, with same options, but placed in another element.
		 */
		cloneTo: function(el) {
			return new Dogefy(el, options);
		},
		/**
		 * Saves the current options to userOptions.
		 * @return: the doge, modified.
		 */
		saveOptions: function() {
			userOptions = options;
			return this;
		},
		/**
		 * To get the current options.
		 * @return: the current options object.
		 */
		getOptions: function() {
			return options;
		},
		/**
		 * To get the dogefied element itself, not a doge.
		 * @return: the dogefied element.
		 */
		whoAmI: function() {
			return elem;
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
	};

	/**
	 * Clear some barks from screen.
	 */
	var clearBarks = function() {
		var p = document.getElementsByClassName('phrase');
		for (var i = 0; i < p.length; i++) {
			p[i].parentNode.removeChild(p[i]);
		}
	};

	/**
	 * Clear all barks in screen.
	 */
	var clearAllBarks = function() {
		doge.prototype.clearAllBarks();
	};

	/**
	 * Adapts doge language to page.
	 */
	var adapt = function() {
		doge.prototype.adapt();
	};


	

	/**
	 * --------------------------------------------------------------------------
	 * AUXILIAR METHODS
	 * --------------------------------------------------------------------------
	 */


			 /**
			  * ----------------------------------------
			  * STYLE RELATED
			  * ----------------------------------------
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
			left: randomInt(pos.left, pos.right) + 'px',
			textShadow: options.shadow ? '5px 5px 5px ' + options.shadowColor : undefined,
			zIndex: options.zIndexes[randomInt(0, options.zIndexes.length - 1)]
		};

		// apply css style
		applyStyle(css, node);

		return node;
	};

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
	};

	/**
	 * Apply a css style to a given node.
	 * @param css: the style to be applyed.
	 * @param node: the element to apply style.
	 */
	var applyStyle = function(css, node) {
		for(i in css){
		   node.style[i] = css[i];
		}
	};


			/**
			 * ----------------------------------------
			 * TEXT ADAPTION RELATED
			 * ----------------------------------------
			 */

	/**
	 * Get the text from all elements in page body, processed as subtexts.
	 * @return: a list with all texts.
	 */
	var getAllProcessedText = function() {
		// all results
		var result = [];

		// the place for processed results
		var processedResult = {
			full: [],
			first: [],
			last: []
		};

		// text to process
		var allTxt = getAllText();

		// prepare texts to classify
		for(i = 0; i < allTxt.length; i++) {
			var resultList = allTxt[i]
				.split(/[\,\.\!\\\/\;\?\'\"\@\#\$\%\&\*\(\)\-\_\=\+\^\~\]\[\{\}\:\>\<]+/)
								.filter(function(val) {
									return val.match(/([A-Za-z])\w+/g);
								});
			var resultList2 = allTxt[i]
				.split(/[\s\,\.\!\\\/\;\?\'\"\@\#\$\%\&\*\(\)\-\_\=\+\^\~\]\[\{\}\:\>\<]+/)
									.filter(function(val) {
										return val.match(/([A-Za-z])\w+/g);
									});

			for(j = 0; j < resultList.length; j++) {
				if (resultList[j].trim().length < 21) {
					result.push(resultList[j].trim().toLowerCase());
				}
			}

			for(j = 0; j < resultList2.length; j++) {
				if (resultList2[j].trim().length < 21) {
					result.push(resultList2[j].trim().toLowerCase());
				}
			}
		}

		// make this unique
		result = uniqueValues(result);

		// put texts in right places
		for(i = 0; i < result.length; i++) {
			if (result[i].length < 3) {
				processedResult.first.push(result[i]);
			} else if (result[i].split(/\s/).length > 1) {
				processedResult.full.push(result[i]);
			} else {
				if (result[i].length < 4 && !inList(result[i], ['wow', 'txt', 'sit'])) {
					processedResult.first.push(result[i]);
				} else if (inList(result[i], ['wow'])) {
					processedResult.full.push(result[i]);
				} else {
					processedResult.last.push(result[i]);
				}
			}
		}

		// the result
		return processedResult;
	};

	/**
	 * Get the text from all elements in page body.
	 * @return: a list with all texts.
	 */
	var getAllText = function() {
		var allText = [document.title, 'adaptive'];

		// get all except script
	    var elements = document.body.getElementsByTagName('*');
	    
	    for(var i = 0; i < elements.length; i++) {
	       var current = elements[i];
	       // Check the element has no children && that it is not empty
	       if(current.children.length === 0 &&
	       			current.textContent.replace(/ |\n\r/g,'') !== '') {

	       		// get it only if is not a script or code block
	       		if (current.outerHTML.indexOf('<script') < 0) {
	       			if (current.outerHTML.indexOf('<code') < 0) {
		       			var txt = current.textContent;
		          		allText.push(txt);
		          	}
	       		}
	       }
	    }

	    return allText;
	};


			/**
			 * ----------------------------------------
			 * AUXILIARY METHODS FOR ALL FUNCTIONS
			 * ----------------------------------------
			 */

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
	 * Method to get a list of unique values.
	 * @param lst: the list to get unique values.
	 * @return: a list with unique values.
	 */
	var uniqueValues = function (lst) {
	    return lst.sort().filter(function(item, pos, array) {
	        return !pos || item != array[pos - 1];
	    })
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
			'clearFrom', 'fonts', 'sizes', 'shadow', 'shadowColor', 'zIndexes',
			'adaptive', 'adaptFrom', 'adaptWhen', 'adaptOn', 'clearAllFrom',
			'clearAllOn', 'clearAllWhen'
		];
	};

	/**
	 * The names of all doge list properties.
	 * @return: all the list names.
	 */
	var listPropNames = function() {
		return [
			'fullWords', 'firstWords', 'lastWords', 'colors', 'barkOn', 'clearOn',
			'manyBarkOn', 'fonts', 'sizes', 'zIndexes', 'adaptOn', 'clearAllOn'
		];
	};

	/**
	 * Auxiliar method to verify if value exists in list.
	 * @param val: the value to test.
	 * @param lst: the list to search.
	 * @return: true if exists, false otherwise.
	 */
	var inList = function(val, lst) {
		return lst.indexOf(val) > -1;
	};

	/**
	 * Auxiliar method to verify if value exists in doge properties.
	 * @param prop: the property to test.
	 * @return: true if exists, false otherwise.
	 */
	var existsProp = function(prop) {
		return inList(prop, propNames());
	};

	/**
	 * Auxiliar method to verify if value exists in list properties of doge.
	 * @param prop: the property to test.
	 * @return: true if exists, false otherwise.
	 */
	var existsListProp = function (prop) {
		return inList(prop, listPropNames());
	};

	// return the Doge object, initialised
	return doge.prototype.init();
}

/**
 * Needed to make any element a doge with $elem.dogefy();.
 * Make sure the $elem is really a DOM Node.
 * With this, we can dogefy any element in the screen as default.
 * @return: dogefy() will return an initialised doge.
 */
(function() {
	Node.prototype.dogefy = function(options) {
		return new Dogefy(this, options);
	}
})();