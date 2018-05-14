/**
 * Implement a view engine:
 *
 * - Parse HTML string
 * - Create according elements: node, text, variable
 * - Implement update function
 *
 * API:
 *
 * const template = build('<h1>{{title}}</h1>');
 * const {el, update} = template({title: 'Hello, World!'});
 * el.outerHTML // <h1>Hello, World!</h1>
 * update({title: 'Hallo Welt!'});
 * el.outerHTML // <h1>Hallo, Welt!</h1>
 */

const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

export function build(tpl) {
    const elem = MATCH_ELEMENT.exec(tpl);
    const txt = MATCH_VARIABLE.exec(elem[2]);
    const nodes = new Map()

    console.log("elem ########");
    console.log(elem);
    console.log("txt ########");
    console.log(txt);


    let result;
    if (elem) {
        result = document.createElement(elem[1]); // h1
        result.appendChild(document.createTextNode(elem[2])); // {{title}}

        nodes.set(txt[1], [document.createTextNode(txt[1])] )
    }

    // return obj => {
    //     return {
    //         el: result
    //     }
    // }


    return function(data) {
        console.log("data ######");
        console.log(data);

        console.log("nodes ######");
        console.log(nodes);

        for(var key in data){
            const elems = nodes.get(key);
            console.log("elems +++");
            console.log(elems);
            for(const elem of elems){
                console.log(elem);
                elem.nodeValue = data[key];
            }
          }

        return {
            el: result
        }
    }


    // console.log(tpl);
    // var match = MATCH_ELEMENT.exec(tpl);
    // if (!match) console.log('no match');
    // for (var c = 1; c < match.length; c++) {
    //     if (!match[c]) continue;
    //     console.log('matching group is: ' + (c - 1));
    // }
    // console.log("####")
    // console.log(tpl);

    // var match2 = MATCH_VARIABLE.exec(tpl);
    // if (!match2) console.log('no match');
    // for (var c = 1; c < match2.length; c++) {
    //     if (!match2[c]) continue;
    //     console.log('matching group is: ' + (c - 1));
    // }
        
}


