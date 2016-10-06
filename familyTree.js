/* 
 * Copyright (c) 2016 Juriy Bodunov-Skvortsov (https://github.com/moscow-beast)
 */
Element.prototype.familyTree = function (obj) {
    var ft = {
        generateChild: function (parent, zygote) {
            if (zygote.forEach === undefined) {
                for (var name in zygote) {
                    switch (typeof zygote[name]) {
                        case 'object':
                            var child = document.createElementNS(ft.familyName, name);
                            var tam = zygote[name];
                            for (var param in tam) {
                                if (typeof child[param] === 'string') {
                                    child[param] = tam[param];
                                } else if (typeof tam[param] === 'string') {
                                    child.setAttribute(param, tam[param]);
                                }
                                if ((typeof tam[param] === 'object') && (param === 'childNodes')) {

                                    tam[param].forEach(function (newgenetation) {
                                        ft.generateChild(child, newgenetation);
                                    });
                                }
                            }
                            parent.appendChild(child);
                            break
                        case 'string':
                            if (name === 'textNode') {
                                parent.appendChild(document.createTextNode(zygote[name]));
                            }
                            break
                    }

                }
            } else {
                zygote.forEach(function(zygote){
                    ft.generateChild(parent, zygote);
                });
            }
        }
    };
    ft.adam = this;
    ft.familyName = ft.adam.namespaceURI;
    ft.tree = obj;
    ft.generateChild(ft.adam, ft.tree);
};