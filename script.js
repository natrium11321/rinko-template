$(function() {
  $('#datetimepicker').datetimepicker({ format: 'L', locale: 'ja' });
  gen();
});
$('input').bind('change keyup mouseup', gen);
$('#datetimepicker').on('change.datetimepicker', gen);

function gen() {
  // retrive variables
  season = $('input[name="season"]:checked').parent().text().trim();
  number = $('#number').val();
  family_name = $('#familyName').val();
  given_name = $('#givenName').val();
  course = $('input[name="course"]:checked').parent().text().trim()
  grade = $('#grade').val();

  moment = $('#datetimepicker').datetimepicker('viewDate');
  year = '';
  academic_year = '';
  date = '';
  if($('#date').val() == moment.format('YYYY/MM/DD')){
    year = moment.year();
    academic_year = moment.month() <= 2 ? year-1 : year;
    date = moment.format('M月D日（dd）');
  }
  
  time = $('input[name="time"]:checked').parent().text().trim();
  room = $('input[name="room"]:checked').parent().text().trim();
  supervisor_family_name = $('#supervisorFamilyName').val();
  supervisor_given_name = $('#supervisorGivenName').val();
  supervisor_poistion = $('input[name="supervisorPosition"]:checked').parent().text().trim();
  chair1_family_name = $('#chair1FamilyName').val();
  chair1_given_name = $('#chair1GivenName').val()

  chair2_family_name = '';
  chair2_given_name = '';
  is534 = $('input[name="room"]:checked').val() == '534';
  if(is534){
    $('.only-534').css('display', 'flex');
    chair2_family_name = $('#chair2FamilyName').val();
    chair2_given_name = $('#chair2GivenName').val()
  }
  else{
    $('.only-534').hide();
  }
  
  type = $('input[name="type"]:checked').parent().text().trim();
  talk_title = $('#talkTitle').val();

  // title
  s = '数理情報学輪講 ' + season + ' 第' + number + '回 概要（' + family_name + ' ' + given_name + '）';
  $('#title').text(s);
  
  // content
  s = '数理情報学輪講関係者の皆様：\n\n';
  s += '数理情報学専攻 ';
  s += course + grade + '年の' + family_name + given_name + 'です．\n';
  
  s += date + 'の数理情報学輪講の概要をお送りします．\n';
  s += 'よろしくお願いいたします．\n\n';
  s += '--- ' + academic_year + '年度 数理情報学輪講 ' + season + ' 第' + number + '回 ---\n\n';
  
  s += '日時：' + year + "年" + date + time + '\n';
  s += '場所：' + room + '\n';
  s += '発表者：' + family_name + ' ' + given_name + '（' + (course == '修士課程' ? '修士' : '博士') + grade + '年）\n';
  s += '指導教員：' + supervisor_family_name + ' ' + supervisor_given_name + ' ' + supervisor_poistion + '\n';
  s += '司会者：' + chair1_family_name + ' ' + chair1_given_name;
  
  if(is534){
    s += '（本郷），' + chair2_family_name + ' ' + chair2_given_name + '（駒場）';
  }
  
  s += '\n\n題目：\n' + talk_title + '（' + type + '）';
  s += '\n\n概要：\n[write abstract here]\n\n参考文献：\n[1]'
  
  $('#content').text(s);
  
  // show warning
  vars = [season, family_name, given_name, course, date, time, room,
    supervisor_family_name, supervisor_given_name, supervisor_poistion, chair1_family_name, chair1_given_name, type, talk_title];
    
  if(is534){
    vars = vars.concat([chair2_family_name, chair2_given_name]);
  }
  
  if(vars.some(v => v == '')){
    $('.alert').show();
  }
  else{
    $('.alert').hide();
  }
}
