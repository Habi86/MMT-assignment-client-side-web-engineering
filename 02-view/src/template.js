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
// const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/;
const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

function setVariable(data, nodes, currentNode) {
    for (var key in data) {
        const elems = nodes.get(key); 

        while (currentNode.firstChild) currentNode.removeChild(currentNode.firstChild);

        for (const elem of elems) {
            currentNode.appendChild(document.createTextNode(data[key]));
        }
    }
}

export function build(tpl) {
    let result = null;
    let currentNode = null;
    let input = tpl;
    let element = null;
    let deeper = true;

    while (deeper) {
        const newElement = MATCH_ELEMENT.exec(input);

        if (newElement) {
            element = newElement;

            if (!result) {
                result = document.createElement(element[1]);
                currentNode = result;

            } else {
                const newNode = document.createElement(element[1]);
                currentNode.appendChild(newNode);
                currentNode = newNode;

            }
        } else {
            deeper = false;

        }
        input = element[2];

    }
    let txt = MATCH_VARIABLE.exec(element[2]);
    const nodes = new Map();
    nodes.set(txt[1], [document.createTextNode(txt[1])]);

    return data => {
        setVariable(data, nodes, currentNode);

        return {
            el: result,
            update: (data) => {setVariable(data, nodes, currentNode);}
        }
    };
}



/*
function createElement(tpl, nodes) {
    const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
    const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;
    
    let [ string, tag, input ] = MATCH_ELEMENT.exec(tpl); // <h1>{{title}}</h1>   h1  {{title}}
    
    // console.log("#######");
    // console.log(string);    
    // console.log(tag);
    // console.log(input);    
    // console.log("####### end");

    // nodes = document.createElement(tag);
    // nodes.appendChild(document.createTextNode(input));

    console.log("nodes###2);");
    console.log(nodes);

    if (MATCH_VARIABLE.exec(input) == null) { // if tags are still found
        console.log("hier dürfte i ned rein beim 1. test");
        nodes = document.createElement(tag);
        return createElement(input, nodes);

    } else {
        let [ variable, txt ] = MATCH_VARIABLE.exec(input); // {{title}}    title
        // console.log(variable);
        // console.log(txt);    
		// let node = document.createElement(tag);
		// let textNode = document.createTextNode(nodes.get(txt));
        // node.appendChild(textNode);    

        let node = document.createElement(tag); 
        node.appendChild(document.createTextNode(variable)); 
    



        if (nodes) {
           nodes.appendChild(node);
           console.log("if nodes is true da bin i ");
        } else {
            nodes = node;
        }

        //nodes.appendChild(document.createTextNode(input));
        console.log("###");
        console.log(nodes);
    
        return { el: nodes };
    
    }

}

export function build(tpl) {
    let nodes = new Map();
    let result = createElement(tpl, nodes); //new result here
    // console.log(nodes);

    // const elem = MATCH_ELEMENT.exec(tpl);
    // const txt = MATCH_VARIABLE.exec(elem[2]);
    // const nodes1 = new Map();

    // result = document.createElement(elem[1]); // h1
    // result.appendChild(document.createTextNode(elem[2])); // {{title}}

    // let test2 = document.createElement('h1'); 
    // test2.appendChild(document.createElement('small')).appendChild(document.createTextNode('{{title}}')); 



    // nodes1.set(txt[1], [document.createTextNode(txt[1])] )



    return data => {
        // let result = {};
        // result = document.createElement(elem[1]); // h1

        for(var key in data){
            const elems = nodes1.get(key); // title
            // console.log("##elem)");
            // console.log(elems[0].nodeValue); // title
            for(const elem of elems){
                // result.appendChild(document.createTextNode(data[key]));
                elem.nodeValue = data[key];

            }
          }
      
        
        return { el: result }
    }

}

*/
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


