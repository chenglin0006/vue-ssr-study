'use strict';
function* es6Test() {
	yield 1;
	yield 2;
	return 3;
}

module.exports = function(){
	// let a = yield es6Test();
	var hw = es6Test();
	let a = hw.next();
	console.log(a);
	let b = hw.next();
	console.log(b);
	let c = hw.next();
	console.log(c);
}
