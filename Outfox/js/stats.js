function statsUIL(fox){
	
    //this.cursor.visible = true;
    leftName.setText(this.NAME);
    leftTypes.setText('Type:\nCharisma:\nSarcasm:\nEgo:\nResolve:\nRespect/Contempt:');
    leftValues.setText(this.TYPE + '\n' + this.CHAR + '\n' + this.SAR + '\n' + this.EGO + '\n' + this.RSLV + '\n' + this.RPCT + '/' + this.CTMP);
    leftUI.visible = true;
    leftIcon.loadTexture('UI', this.TXTR);
    leftName.visible = true;
    leftTypes.visible = true;
    leftValues.visible = true;
    leftIcon.visible = true;
    
    
}

function statsUIR(fox){
	
    //this.cursor.visible = true;
    rightName.setText(this.NAME);
    rightTypes.setText('Type:\nCharisma:\nSarcasm:\nEgo:\nResolve:\nRespect/Contempt:');
    rightValues.setText(this.TYPE + '\n' + this.CHAR + '\n' + this.SAR + '\n' + this.EGO + '\n' + this.RSLV + '\n' + this.RPCT + '/' + this.CTMP);
    rightUI.visible = true;
    rightIcon.loadTexture('UI', this.TXTR);
    rightName.visible = true;
    rightTypes.visible = true;
    rightValues.visible = true;
    rightIcon.visible = true;
    rightTarget.loadTexture('UI', 's_foxTarget');
    
    
}