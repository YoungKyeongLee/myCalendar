function createCalendar(){
	const year = selectDay.getFullYear();
	const month = selectDay.getMonth();
	document.getElementById('calendarTitle').innerHTML = year + '년 ' + ( (month <= 8) ? '0' : '') + (month+1) + '월';
	Calendar.innerHTML = '';
	let week = 0;
	
	pushWeekDiv();
	
	pushDayDiv('name', 'SUN', week);
	pushDayDiv('name', 'MON', week);
	pushDayDiv('name', 'TUE', week);
	pushDayDiv('name', 'WED', week);
	pushDayDiv('name', 'THU', week);
	pushDayDiv('name', 'FRI', week);
	pushDayDiv('name', 'SAT', week++);
	
	const firstDate = new Date(year, month, 1);
	const lastDate = new Date(year, month+1, 0);
	const lastDateNum = lastDate.getDate();
	const lastMonth = new Date(year, month, 0);
	// 0~6 (일~)
	const firstDay = firstDate.getDay();
	const lastDay = lastDate.getDay();
	
	let lastMonthLastDay = lastMonth.getDate() - (firstDay - 1);
	let index = firstDay;
	pushWeekDiv();
	
	for(let i = 0; i < firstDay; i++){
		// 시작 일 전
		pushDayDiv('beforeDay', lastMonthLastDay++, week);
	}
	for(let day = 1; day <= lastDateNum; day++){
		// 달력 날
		if(index === 0){
			pushWeekDiv();
			week++;
		}
		pushDayDiv('activeDay', day, week);
		index = index === 6 ? 0 : index + 1;
	}
	let afterDay = 1;
	for(let i = (lastDay + 1); i <= 6; i++){
		// 끝
		pushDayDiv('afterDay', afterDay++, week);
	}
	
}
function pushWeekDiv(){
	let weekBox = document.createElement('div');
	weekBox.setAttribute('class', 'week');
	Calendar.appendChild(weekBox);
}

function pushDayDiv(className, text, week){
	let dayBox = document.createElement('div');
	dayBox.setAttribute('class', className);
	dayBox.innerHTML = '<span>' + text + '</span>';
	Calendar.children[week].appendChild(dayBox);
	
}
function changeCalendar(where){
	selectDay = new Date(selectDay.setMonth(selectDay.getMonth() + where));
	createCalendar();
}