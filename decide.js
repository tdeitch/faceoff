window.onload = function() {
    // "shortcuts" to commonly used stuff (YUICompressor will then
    // also shrink these down to short names)
    var document = window.document,
        body = document.body;
    function $(id) {
        return document.getElementById(id);
    }
    function createElement(tag) {
        return document.createElement(tag);
    }
    function createTextNode(text) {
        return document.createTextNode(text);
    }
    function innerText(element) {
        if (element.innerText) return element.innerText; // Safari
        if (element.textContent) return element.textContent; // FF
        return ''; // should really do something here
    }
    function appendChild(parent,child) {
        parent.appendChild(child);
    }
    function setAttribute(element,name,value) {
        element.setAttribute(name, value);
    }
    function getElementsByTagName(element,name) {
        return element.getElementsByTagName(name);
    }
    
    if ( !window.localStorage ) {
        $('add_note').innerHTML = "Browser does not support local storage."
        return;
    }
    
    var notesList = $('notes'),
        noteForm = $('note_form'),
        links = $('links');
   
    function listTODO(key, val) {
        var li = createElement('li');
        appendChild(li, createTextNode(val));
        setAttribute(li,'id', 'note_'+key);
        notesList.insertBefore(li,$('add_note'));
    }
 
    /*read the notes and insert them into the DOM*/
    function listTODOs() {
        for ( var key in localStorage ) {
            var val = localStorage.getItem(key);
            listTODO(key, val);
        }
    }
    
    function insertTODO(description) {
        localStorage.setItem(localStorage.length, description);
        listTODO(localStorage.length, description);
    }
    
    noteForm.onsubmit = function() {
        var value = $('add_note_input').value;
        if ( value ) {
            insertTODO(value);
            $('add_note_input').value = '';
        }
        return false;
    };
    
    function createDeleteLink(ul,li,id) {
        var del = createElement('a');
        setAttribute(del,'href','');
        del.className='delete';
        appendChild(del, createTextNode('x'));
        setAttribute(del,'title','Delete this todo item');
        del.onclick = function() {
            var newid = parseInt(li.children[0].id.substr(6),10);
            li.id = 'todeleteli';
            var note = $('note_'+newid);
            note.id = 'todeletenote';
            for (var i = newid + 1; i < localStorage.length; i++) {
                localStorage.setItem(i - 1, localStorage.getItem(i));
                document.getElementById('input_'+i).id = 'input_'+(i-1);
                document.getElementById('note_'+i).id = 'note_'+(i-1);
            }
            localStorage.removeItem(localStorage.length - 1);
            ul.removeChild(li);
            note.parentNode.removeChild(note);
            return false;
        }
        return del;
    }
    
    $('edit').onclick = function() {
        // hide edit link and note form
        links.className='hidden';
        noteForm.className='hidden';
        
        var editForm = createElement('form'),
            editList = createElement('ul'),
            saveButton = createElement('input'),
            cancelLink = createElement('a');
        setAttribute(editForm,'id', 'edit_form');
        setAttribute(saveButton,'type','submit');
        saveButton.value='Save';
        setAttribute(cancelLink,'href','');
        appendChild(cancelLink,createTextNode('Cancel'));
        
        appendChild(editForm,editList);
        
        var items = getElementsByTagName(notesList,'li');
        for ( var i = 0; i < items.length; i++ ) {
            var itemID = items[i].id;
            if ( itemID != 'add_note') {
                var id = Number(itemID.substring('note_'.length)),
                    li = createElement('li'),
                    input = createElement('input');
                setAttribute(input,'id', 'input_'+id);
                // load text value from dom (relies on innerHTML)
                input.value = items[i].innerText;
                var del = createDeleteLink(editList,li,id);
                appendChild(li,input);
                appendChild(li,del);
                appendChild(editList,li);
            }
        }
        
        appendChild(editForm,saveButton);
        appendChild(editForm,createTextNode(' or '));
        appendChild(editForm,cancelLink);
        
        appendChild(body,editForm);
        
        function showNoteForm() {
            // show edit link and note_form again
            links.className='';
            noteForm.className='';
            body.removeChild(editForm);
        }
        
        cancelLink.onclick = function() {
            showNoteForm();
            return false;
        };
        
        editForm.onsubmit = function() {
            var inputs = document.querySelectorAll('*[id^="input_"]');
            for ( var i = 0; i < inputs.length; i++ ) {
                var input = inputs[i];
                var keyid = input.id.substr(6,input.id.length);
		var key = parseInt(keyid,10);
                localStorage.setItem(key, input.value);
                $('note_' + keyid).innerText = input.value;
            }
	    showNoteForm();
            return false;
        };
        return false;
    }

    function getOrder(best, num) {
        if (num >= localStorage.length) {
            $('decision').innerHTML = 'And the winner is...<br><br><b>' + localStorage.getItem(best) + '</b>';
        }
        else {
            $('decision').innerHTML = '<a href="#" id="choiceOne">' + localStorage.getItem(best) + '</a><br><br>OR<br><br><a href="#" id="choiceTwo">' + localStorage.getItem(num) + '</a>';
            $('choiceOne').onclick = function() { getOrder(best, num + 1) };
            $('choiceTwo').onclick = function() { getOrder(num, num + 1) };
        }
    }
 
    $('go-button').onclick = function() {
        noteForm.className = 'hidden';
        getOrder(0, 1);
    }

    listTODOs();

}
