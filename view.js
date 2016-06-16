//-----------------------------------------------------------------------------
// Public methods
//-----------------------------------------------------------------------------
function create_note(params) {
  return '<html>'+
            '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
            '</head>'+
            '<body>'+
                '<form action="' + params["action"] +'" method="post">'+
                    '<div style="padding-bottom: 12px;">' +
                        '<input autofocus placeholder="An author name..." type="text" name="author" size="60" style="border-style:groove"></imput>'+
                    '</div>' +
                    '<div>' +
                        '<textarea placeholder="Add a note..." name="note" rows="10" cols="60" style="border-style:groove"></textarea>'+
                    '</div>' +
                    '</br>' +
                    '<div>' +
                        '<input type="submit" value="Add Note" />'+
                    '</div>' +
                '</form>'+
            '</body>'+
        '</html>';
};


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.create_note = create_note;