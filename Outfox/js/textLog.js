function add2Log(text){
	// get the length of characters in the logCount array
	logCount = gameLog.text.length;

	// if this is the first time the log is counted, set the lineCount
	if(firstLog == false){
		console.log('logCount: ' + logCount);

		// get the number of lines the text will take up in the log box
    	logLines = Phaser.Math.roundAwayFromZero(logCount/38);
    	console.log('logLines: ' + logLines);

    	// set the lineCount's initial number
    	lineCount = logLines;
    	console.log('lineCount: ' + lineCount);

    	// ensure this doesn't happen more than once per game
    	firstLog = true;
	}
    
    // get the length of characters in the incoming text string
 	textCount = text.length;
    console.log('textCount: ' + textCount);

    // get the number of lines the text will take up in the log box
    textLines = Phaser.Math.roundAwayFromZero(textCount/38);
    console.log('textLines: ' + textLines);

    // tally the current line count with the new text line count
    lineCount += textLines;
    console.log('lineCount: ' + lineCount);

    // if the log box isn't going to overflow, add the new text line
    if(lineCount <= 7){
        gameLog.text += '\n' + text;
        console.log('chars & lines under par');

    // otherwise push the log box text up 16 pixels per line being added then add the new text line
    } else {
    	console.log('chars & lines over par');
    	while(lineCount > 7){
    		lineCount--;
    		linePush += 15;
    	}
    	console.log('linePush: ' + linePush);
        gameLog.y = gameLog.y - linePush;
        gameLog.text += '\n' + text;
        linePush = 0;

    }
}