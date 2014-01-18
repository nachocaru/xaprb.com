function doMatch(form) {
    var er = document.getElementById('msg');
    if (er) {
        er.innerHTML = '&nbsp;';
        er.className = "";
    }
    try {
        if (form.regex.value === '' || form.sample.value === '') return false;
        var table = document.getElementById('table');
        var bodies = table.getElementsByTagName("tbody");
        while(bodies.length > 0) {
            table.removeChild(bodies[0]);
            bodies = table.getElementsByTagName("tbody");
        }
        var options = (form.optioni.checked ? "i" : "")
            + (form.optiong.checked ? "g" : "")
            + (form.optionm.checked ? "m" : "");
        var re = new RegExp(form.regex.value, options);
        var res = re.exec(form.sample.value);
        var count = 0;
        if (res && res.length > 0) {
            do {

                // First row
                var tb = document.createElement("tbody");
                var tr = document.createElement("tr");
                tr.className = "first-child";
                var th1 = document.createElement("td");
                th1.className = "first-child";
                th1.appendChild(document.createTextNode("Match " + count + " (Group 0)"));
                tr.appendChild(th1);
                tr.appendChild(document.createElement("td")).appendChild(
                    document.createTextNode(res.index + "-" + (res[0].length + res.index - 1)));
                tr.appendChild(document.createElement("td")).appendChild(
                    document.createTextNode(res[0]));
                tr.onmouseup = highlightMatch;
                tb.appendChild(tr);

                var curIndex = 0;
                for (var i = 1; i < res.length; ++i) {
                    // Remaining rows
                    var tr = document.createElement("tr");
                    tr.onmouseup = highlightMatch;
                    if (i == res.length - 1) {
                        tr.className = "last-child";
                    }
                    var td1 = document.createElement("td");
                    td1.className = "first-child";
                    td1.appendChild(document.createTextNode("Group " + i));
                    tr.appendChild(td1);
                    // When a capture doesn't participate in the match, IE will create a property with "",
                    // Firefox will create one without a value, and Opera won't create one.
                    if (res[i]) {
                        curIndex = res[0].indexOf(res[i], curIndex);
                        tr.appendChild(document.createElement("td")).appendChild(
                            document.createTextNode(
                                (res.index + curIndex)
                                + "-"
                                + (res[i].length + res.index + curIndex - 1)));
                        tr.appendChild(document.createElement("td")).appendChild(
                            document.createTextNode(res[i] ? res[i] : ""));
                    }
                    else {
                        tr.appendChild(document.createElement("td")).appendChild(
                            document.createTextNode(res[i] === undefined ? "null" : ""));
                        tr.appendChild(document.createElement("td")).appendChild(
                            document.createTextNode(res[i] === undefined ? "null" : ""));
                    }
                    tb.appendChild(tr);
                }

                table.appendChild(tb);
                count++;
            }
            while (options.indexOf("g") >= 0
                && (res = re.exec(form.sample.value)) != null
                && res.length > 0);
        }
    }
    catch (e) {
        er.innerHTML = e.name + ":" + e.message;
        er.className = "error";
    }
}

// Inspired by Alex King's quicktags functionality for WordPress.
function insertText(field, before, after) {
    //IE and Opera support
    if (document.selection) {
        field.focus();
        var sel = document.selection.createRange();
        if (sel.text.length > 0) {
            sel.text = before + sel.text + after;
        }
        else {
            sel.text = before + after;
        }
        field.focus();
    }
    //Mozilla support
    else if (field.selectionStart || field.selectionStart == '0') {
        var startPos = field.selectionStart;
        var endPos = field.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = field.scrollTop;
        if (startPos != endPos) {
            field.value = field.value.substring(0, startPos)
                + before
                + field.value.substring(startPos, endPos)
                + after
                + field.value.substring(endPos, field.value.length);
            cursorPos += before.length + after.length;
        }
        else {
            field.value = field.value.substring(0, startPos)
                          + before + after
                          + field.value.substring(endPos, field.value.length);
            cursorPos = startPos + before.length;
        }
        field.focus();
        field.selectionStart = cursorPos;
        field.selectionEnd = cursorPos;
        field.scrollTop = scrollTop;
    }
    else {
        field.value += before + after;
        field.focus();
    }
    return false;
}

function highlightMatch(e) {
    var t = this.getElementsByTagName("td")[1].firstChild.data;
    var m = t.match("(\\d+)-(\\d+)");
    if (m) {
        var f = document.forms[0].sample;
        selectText(f, parseInt(m[1]), parseInt(m[2]));
    }
    return false;
}

function selectText(field, start, end) {
    field.focus();
    field.select();
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.moveStart("character", start);
        sel.moveEnd("character", end - field.value.length + 1);
        sel.select();
        field.focus();
    }
    else if (field.selectionStart || field.selectionStart == '0') {
        field.focus();
        field.selectionStart = start;
        field.selectionEnd = end + 1;
        field.scrollTop = start;
    }
}
