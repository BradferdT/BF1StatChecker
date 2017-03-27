$(document).ready(function(){
  var platform = '3';
  if(localStorage.getItem('theme') == null){
    localStorage.setItem('theme','red');
  }
  $('nav .nav-wrapper').addClass(localStorage.getItem('theme'));
  $('.btn_li .btn').addClass(localStorage.getItem('theme'));
  console.log(localStorage.getItem('theme'));

  $('#theme_drop li a').click(function(){
    var prev = localStorage.getItem('theme');
    $('nav .nav-wrapper').removeClass(prev);
    $('.btn_li .btn').removeClass(prev);
    localStorage.setItem('theme',$(this).attr('id'));
    $('nav .nav-wrapper').addClass(localStorage.getItem('theme'));
    $('.btn_li .btn').addClass(localStorage.getItem('theme'));
  })


   $('.btn_li a').click(function(){
     $('.btn_li a').removeClass('icon_active');
     $(this).addClass('icon_active');
     platform = $(this).attr('id')
   });

   $('#formPlayer').submit(function(event){
     $('.tab_container').empty();
     var pNames = $('#search').val();
     var namesArray = pNames.split(',');
     for(var i = 0; i < namesArray.length; i++){
       namesArray[i] = namesArray[i].trim();
       Materialize.toast('Added ' + namesArray[i], 3000, `rounded ${localStorage.getItem('theme')}`);
     }
     //https://cors-anywhere.herokuapp.com/
     for(var i = 0; i < namesArray.length; i++){
         $.ajax({
           method: 'GET',
           url: `https://cors-anywhere.herokuapp.com/https://battlefieldtracker.com/bf1/api/Stats/BasicStats?platform=${platform}&displayName=${namesArray[i]}`,
           headers: {
             "TRN-Api-Key": "13e1c681-a95e-4bb3-be27-3ef604d7ce1c"
           },
           dataType: "json",
           beforeSend: function(){
             $('.progress').show();
           },
           complete: function(){
             $('.progress').hide();
           }
         })
         .done(function(data) {
           $('.tab_container').append(`
             <div class="col s12 tab_info">
             <div class="row tab_background_color">
               <div class="col s1">
               <div class="rank">
                 <img src="https://battlefieldtracker.com/Images/bf1/ranks/${data.result.rank.number}.png">
                 <div class="details">
                   <span>${data.result.rank.name}</span>
                 </div>
               </div>
             </div>
             <div class="col s2">
             <div class="stat right">
               <div class="title">
                 <span>Player Name</span>
               </div>
               <div class="details">
                 <span>${data.profile.displayName}</span>
               </div>
             </div>
         </div>
               <div class="col s1">
               <div class="stat">
                 <div class="title">
                   <span>Time Played</span>
                 </div>
                 <div class="details">
                   <span>${(data.result.timePlayed / 1000).toFixed(2)}Hr</span>
                 </div>
               </div>
           </div>
           <div class="col s1">
           <div class="stat">
             <div class="title">
               <span>Kills</span>
             </div>
             <div class="details">
               <span>${data.result.kills}</span>
             </div>
           </div>
       </div>
       <div class="col s1">
       <div class="stat">
         <div class="title">
           <span>Deaths</span>
         </div>
         <div class="details">
           <span>${data.result.deaths}</span>
         </div>
       </div>
     </div>
     <div class="col s1">
     <div class="stat">
       <div class="title">
         <span>K/D</span>
       </div>
       <div class="details">
         <span>${(data.result.kills / data.result.deaths).toFixed(2)}</span>
       </div>
     </div>
   </div>
     <div class="col s1">
     <div class="stat">
       <div class="title">
         <span>Wins</span>
       </div>
       <div class="details">
         <span>${data.result.wins}</span>
       </div>
     </div>
     </div>
     <div class="col s1">
     <div class="stat">
       <div class="title">
         <span>Losses</span>
       </div>
       <div class="details">
         <span>${data.result.losses}</span>
       </div>
     </div>
     </div>
     <div class="col s1">
     <div class="stat">
       <div class="title">
         <span>W/L</span>
       </div>
       <div class="details">
         <span>${(data.result.wins / data.result.losses).toFixed(2)}</span>
       </div>
     </div>
     </div>
     <div class="col s1">
     <div class="stat">
       <div class="title">
         <span>Skill</span>
       </div>
       <div class="details">
         <span>${data.result.skill}</span>
       </div>
     </div>
     </div>
     <div class="row">
       <div class="col s3">
         <div class="exp right">
           <span>Current experience ${data.result.rankProgress.current}</span>
         </div>
       </div>

       <div class="col s5">
       <div class="urProgress center-align">
   <div class="bar" style="width: ${(data.result.rankProgress.current / data.result.rankProgress.total).toFixed(2) * 100}%">${Math.ceil((data.result.rankProgress.current / data.result.rankProgress.total).toFixed(2) * 100)}% till rank ${data.result.rank.number + 1}</div>
      </div>
       </div>
       <div class="col s2">
         <div class="exp left">
           <span> Next level at ${data.result.rankProgress.total}</span>
         </div>
       </div>
     </div>`)
         })
         .fail(function() {
           $('.tab_container').append(`
             <div class="col s12 tab_info">
   <div class="row">
      <div class="col s12 tab_error">
         <div class="col s6 err_msg">
            <span>Error 400: Player Name Not Found
         </div>
         <div class="col s6">
            <img class="right" src="wut.jpg" alt="error image">
         </div>
      </div>
   </div>
</div>`)
         })
     }
     event.preventDefault();
   })
})
