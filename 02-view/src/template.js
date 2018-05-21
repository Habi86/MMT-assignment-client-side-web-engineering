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




function createElement() {



}



export function build(tpl) {
    console.log(tpl);

    const elem = MATCH_ELEMENT.exec(tpl);
    const txt = MATCH_VARIABLE.exec(elem[2]);
    const nodes = new Map();

    // result = document.createElement(elem[1]); // h1
    // result.appendChild(document.createTextNode(elem[2])); // {{title}}

    // let test2 = document.createElement('h1'); 
    // test2.appendChild(document.createElement('small')).appendChild(document.createTextNode('{{title}}')); 



    nodes.set(txt[1], [document.createTextNode(txt[1])] )



    return data => {
        let result = {};
        result = document.createElement(elem[1]); // h1

        for(var key in data){
            const elems = nodes.get(key); // title
            // console.log("##elem)");
            // console.log(elems[0].nodeValue); // title
            for(const elem of elems){
                result.appendChild(document.createTextNode(data[key]));

            }
          }
      
        
        return { el: result }
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
        

