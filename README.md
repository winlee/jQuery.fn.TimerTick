# jQuery.fn.TimerTick
A jquery plugin, for count down result.

# Purpose
To add more than one interval of count down timer in one page, so I'm use a global array save all the interval callback, and clear it when it expired.

# Usage

the usage is very easy
 ## arguments 
 
 * id: this is a what you want make one timer indentify, and also use to clear it.
 * options 

   *  endTime: this parameter set for when this timer stop and clear the interval, default value is current time plus 1 hour
   *  callback: this parameter set for the thing to do when the timer stop. ie, hide the tick time panel(00:00:00) 
   *  interval: as you see, this parameter set for the interval time. unit is ms. default value is 1000ms
 
 
 
 ## example
  ```javascript
  <script>
   $("#countdown").TimerTick(@item.OrderNo,
                      {
                          endTime: '2017-05-04 18:45:00',
                          callback: function() {
                              alert("count down. time expired.");
                          }
                      });
  </script>
  ```

# next step
as we know, this is a part-time achievement, but i'm still to complete it's function. And I also has some confused about concepts of js(closure, this scope， etc.)
