var calendarLabels = {
  "dayLabels": [     
    {"dayLabel":  "Do"},
    {"dayLabel":  "Lu"},
    {"dayLabel":  "Ma"}, 
    {"dayLabel":  "Mi"},
    {"dayLabel":  "Ju"},
    {"dayLabel":  "Vi"},
    {"dayLabel":  "Sa"}
  ],
  "monthLabels": [
    {"monthLabel": "Enero"},
    {"monthLabel": "Febrero"},
    {"monthLabel": "Marzo"},
    {"monthLabel": "Abril"},
    {"monthLabel": "Mayo"},
    {"monthLabel": "Junio"},
    {"monthLabel": "Julio"},
    {"monthLabel": "Agosto"},
    {"monthLabel": "Septiembre"},
    {"monthLabel": "Octubre"},
    {"monthLabel": "Noviembre"},
    {"monthLabel": "Diciembre"}    
  ]
}

function createMonth(month){
  //month is a Date object
  var firstDayOfTheMonthNumber,
      i, 
      remainingCellsCounter = 0,
      monthNumber = month.getMonth(),
      monthSize,
      previousMonthSize,
      temporalDate,
      temporalPreviousMonth,
      temporalNextMonth,
      temporalDayNumber,
      yearNumber = month.getFullYear();

  $('.notThisMonth').removeClass('notThisMonth');
  $('.nextMonth').removeClass('nextMonth');
  $('.thisMonth').removeClass('thisMonth');
  $('.previousMonth').removeClass('previousMonth');
  $('.selectedCell').removeClass('selectedCell');
  
  temporalPreviousMonth = new Date(yearNumber,monthNumber -1);
  temporalNextMonth = new Date(yearNumber,monthNumber +1);
  
  monthSize = getMonthSize(month);
  previousMonthSize = getMonthSize(temporalPreviousMonth);
  firstDayOfTheMonthNumber = getDayofTheWeekOfFirstDayOfTheMonth(month);

  $('.full-month-header-container').find('.between-arrows').find('h2').text(monthNumberToMonthLabel(monthNumber));
  $('.full-month-header-container').find('.yearPreview').text(month.getFullYear());

  $('.full-month-header-container').find('.arrow-left').attr({
      'month': temporalPreviousMonth.getMonth(),
      'year': temporalPreviousMonth.getFullYear()
  });

  $('.full-month-header-container').find('.arrow-right').attr({
      'month': temporalNextMonth.getMonth(),
      'year': temporalNextMonth.getFullYear()
  });

  for (i = 0; i < 7; i++) {
    $('.calendar-row-days').find('.activeHeader').text(dayNumberToDayLabel(i));
    $('.calendar-row-days').find('.activeHeader').next().addClass('activeHeader');
    $('.calendar-row-days').find('.activeHeader:first').removeClass('activeHeader');
  };

  temporalDayNumber = previousMonthSize - firstDayOfTheMonthNumber + 1;

  for(i = previousMonthSize, loopTimes = previousMonthSize - firstDayOfTheMonthNumber; i > loopTimes; i--){
    $('.activeCell').removeClass($('.activeCell').attr('date'));
    $('.activeCell').addClass('notThisMonth');
    $('.activeCell').addClass('previousMonth');    
    temporalDate = 'd'+temporalDayNumber + '-m' + (temporalPreviousMonth.getMonth() + 1) + '-y' +temporalPreviousMonth.getFullYear();
    
    $('.activeCell').text(temporalDayNumber);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
    temporalDayNumber++;
    remainingCellsCounter++;
  }

  for(i = 1;i <= monthSize;i++){
    $('.activeCell').removeClass($('.activeCell').attr('date'));
    $('.activeCell').addClass('thisMonth');

    temporalDate = 'd'+i + '-m' + (month.getMonth() + 1) + '-y' +month.getFullYear();
    $('.activeCell').text(i);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
    remainingCellsCounter++;
  }

  for(i = 1, loopTimes = (42 - remainingCellsCounter);i <= loopTimes;i++){
    $('.activeCell').removeClass($('.activeCell').attr('date'));
    $('.activeCell').addClass('notThisMonth');
    $('.activeCell').addClass('nextMonth');
    temporalDate = 'd'+i + '-m' + (temporalNextMonth.getMonth() + 1) + '-y' +temporalNextMonth.getFullYear();
    $('.activeCell').text(i);
    $('.activeCell').attr('date', temporalDate);
    $('.activeCell').addClass(temporalDate);
    $('.activeCell').next().addClass('activeCell');
    $('.activeCell:first').removeClass('activeCell');
  }

  $('.full-month-header-container').next().addClass('activeCell');
}

function dayNumberToDayLabel(dayNumber){
  //dayNumber has values from 0-6 
  return calendarLabels.dayLabels[dayNumber].dayLabel;
}

function monthNumberToMonthLabel(monthNumber){
  // monthNumber has values from 0-11
  return calendarLabels.monthLabels[monthNumber].monthLabel;
}

function getDayofTheWeekOfFirstDayOfTheMonth(month){
  //The month is a Date object

  var dayOfTheWeek = new Date(month.getFullYear(),month.getMonth());

  dayOfTheWeek.setDate(1);
  dayOfTheWeek = dayOfTheWeek.getDay();

  return dayOfTheWeek;
}

function getMonthSize(month){
  //The month is a Date object

  var  monthSize = new Date(month.getFullYear(),(month.getMonth() + 1));

  monthSize.setDate(0);
  monthSize = monthSize.getDate();

  return monthSize;
}

function onPressShowDayAndMonth(){
  var month,
      selectedDate = $(this).attr('date');

  $('.selectedCell').removeClass('selectedCell');
  $('.day-preview').find('.day').find('h1').text($(this).text());

  if($(this).hasClass('notThisMonth')){
    
    if($(this).hasClass('previousMonth')){
      month = new Date($('.arrow-left').attr('year'),$('.arrow-left').attr('month'));      
    }else{
      month = new Date($('.arrow-right').attr('year'),$('.arrow-right').attr('month'));
    }
    createMonth(month);
    $('.'+selectedDate).addClass('selectedCell');
  }else{
      $('.day-preview').find('.day').find('h1').text($(this).text());
      $(this).addClass('selectedCell');
  }

  $('.day-preview-header').find('.month').text($('.full-month-header-container').find('.between-arrows').find('h2').text());
  $('.day-preview-header').find('.year').text($('.full-month-header-container').find('.yearPreview').text());
}

function arrowClickChangeMonth(){
  var month = new Date($(this).attr('year'),$(this).attr('month'));
  createMonth(month);
}

function start(){
  var month = new Date(),
      todayDate = 'd' + month.getDate() + '-m' + (month.getMonth() + 1) + '-y' + month.getFullYear();
  createMonth(month);

  $('.day-preview').find('.day').find('h1').text(month.getDate());
  $('.day-preview-header').find('.month').text($('.full-month-header-container').find('.between-arrows').find('h2').text());
  $('.day-preview-header').find('.year').text($('.full-month-header-container').find('.yearPreview').text());
  $('.' + todayDate).addClass('selectedCell');

  $('.arrow-left').on('click', arrowClickChangeMonth);
  $('.arrow-right').on('click', arrowClickChangeMonth);
  $('.calendar-cell').on('click', onPressShowDayAndMonth);
}

$(document).on('ready', start);