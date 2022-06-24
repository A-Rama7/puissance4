
    class Game {

        constructor() {
           let start_btn;
           let stop_btn;
           start_btn = $(':input:button.start');
           stop_btn = $(':input:button.stop');
           let app = 0;
           $(() => {
               start_btn.on('click', () => {
                   console.log('Start');
                   if (!app) {
                       app = new App();
                       app.play();
                       start_btn.toggleClass("hide");
                       stop_btn.toggleClass("hide");
                   }
               });
           });
           
           $(() => {
               stop_btn.on('click', () => {
                   console.log('Stop');
                   let elem = $('#board');
                   if (elem.length) {
                       elem.empty();
                       app = 0;
                       start_btn.toggleClass("hide");
                       stop_btn.toggleClass("hide");
                   }
               });
           });
       }
   }
   
   class App
   {
       // draw_board
       constructor(){
           const parent = $('#board');
           let x = 0;
           let y = 0;
           while(x < 6)
           {
               const row = document.createElement('div');
               row.className = 'row';
               parent.append(row);
               y = 0;
       
               while(y < 7)
               {
                   const cell = document.createElement('div');
                   cell.className = 'cell';
                   row.append(cell);
                   y++;
               }
               x++;
           }
       }

       play = ()=> {
           let player = 1;
           let cells = $('.cell');
           let nb = 0;
           let count = 0;
           var nextCell;
           var laser1 = new Audio('./151022__bubaproducer__laser-shot-silenced.wav');
           var laser2 = new Audio('./434834__notyermom__laser.wav');
           console.log(cells);
           var lastCell;
           cells.each(function () {
               
               $(this).attr("id", nb);
               nb++;
               $(this).on('click', function() {
                console.log(laser1);
                laser1.play();
                   nextCell = getNextCell($(this).attr("id"));
                   console.log($(this));
                   if ($(this).hasClass("last") && !($(this).hasClass("full"))) {
                        if (player == 1) {
                            if ((nextCell.hasClass("full"))) {
                                $(this).addClass("red");
                                $(this).addClass("full");
                                $(this).removeClass("last");

                                player = 2;
                                console.log("player "+player);
                            //    console.log(nextCell);
                            //    console.log("ok");
                                lastCell =(getNextCell((parseInt($(this).attr("id"))-14)));
                                lastCell.addClass("last");
                                // console.log("last");
                                // console.log(lastCell);
                            //    console.log("ok");
                            }
                        }
                        else if ((nextCell.hasClass("full"))) {
                            $(this).addClass("yellow");
                            $(this).addClass("full");
                            $(this).removeClass("last");

                            player = 1;
                            console.log("player "+player);
                            // console.log(nextCell);
                            console.log("ok");
                            lastCell =(getNextCell((parseInt($(this).attr("id"))-14)));
                            lastCell.addClass("last");
                            // console.log("last");
                            // console.log(lastCell);
                            // console.log("ok");
                        }
                    }

                    else {
                        while (!(nextCell.hasClass("full"))) {
                            if (parseInt(nextCell.attr("id")) >= 35 || nextCell.hasClass("last")) {
                                if (player == 1) {
                                    if (!(nextCell.hasClass("full"))) {
                                        nextCell.addClass("red");
                                        nextCell.addClass("full");
                                        player = 2;
                                        console.log("player "+player);
                                        // console.log(nextCell);
                                        // console.log("ok");
                                        lastCell =(getNextCell((parseInt($(nextCell).attr("id"))-14)));
                                        lastCell.addClass("last");
                                        // console.log(lastCell);
                                        // console.log("ok");
                                    }
                                }
                                else {
                                    if (!(nextCell.hasClass("full"))) {
                                        nextCell.addClass("yellow");
                                        nextCell.addClass("full");
                                        player = 1;
                                        console.log("player "+player);
                                        // console.log(nextCell);
                                        // console.log("ok");
                                        lastCell = (getNextCell((parseInt($(nextCell).attr("id"))-14)));
                                        lastCell.addClass("last");
                                        // console.log(lastCell);
                                        // console.log("ok");
                                    }
                                }
                            }
                            else {
                                nextCell = getNextCell(nextCell.attr("id"));
                            }
                        }
                    }
                    var check_win =$("#0");
                    var id = (parseInt(check_win.attr("id")))
                    var count_red_line = 0;
                    var count_red_column = 0;
                    var count_red_diagonal = 0;
                    var count_yellow_line = 0;
                    var count_yellow_column = 0;
                    var count_yellow_diagonal = 0;
                    // console.log(id);
                    // console.log(check_win);
                    while (id < 41) {

                        // check lines---------------------------------------------------------
                        count_red_line = check_red_line(count_red_line, check_win, id);
                        count_yellow_line = check_yellow_line(count_yellow_line, check_win, id);
                        if (count_red_line == 4 ||
                            count_red_column == 4 ||
                            count_red_diagonal == 4
                            ) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_line == 4 ||
                                count_yellow_column == 4 ||
                                count_yellow_diagonal == 4
                                ) {
                                    alert("le joueur jaune a gagné");
                                }
                        // console.log("red");
                        // console.log(count_red_line);
                        // console.log("yellow");
                        // console.log(count_yellow_line);
                        id = parseInt(check_win.attr("id"))
                        check_win = (goRight(id));
                        // console.log(check_win);
                        // console.log(id);
                    }
                    // check columns---------------------------------------------------------
                    check_win = $("#0");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    // console.log(id);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log("red");
                    // console.log(count_red_column);
                    // console.log("yellow");
                    // console.log(count_yellow_column);
                    while (id < 35) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_line == 4 ||
                            count_red_column == 4 ||
                            count_red_diagonal == 4
                            ) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#1");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log(id);
                    console.log("red");
                    console.log(count_red_column);
                    console.log("yellow");
                    console.log(count_yellow_column);
                    while (id < 36 ) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_line == 4 ||
                            count_red_column == 4 ||
                            count_red_diagonal == 4
                            ) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#2");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log(id);
                    console.log("red");
                    console.log(count_red_column);
                    console.log("yellow");
                    console.log(count_yellow_column);
                    while (id < 37) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_column == 4) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#3");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log(id);
                    // console.log("red");
                    // console.log(count_red_column);
                    // console.log("yellow");
                    // console.log(count_yellow_column);
                    while (id < 38 ) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_column == 4) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#4");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // // console.log(id);
                    // console.log("red");
                    // console.log(count_red_column);
                    // console.log("yellow");
                    // console.log(count_yellow_column);
                    while (id < 39 ) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_column == 4) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#5");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log(id);
                    // console.log("red");
                    // console.log(count_red_column);
                    // console.log("yellow");
                    // console.log(count_yellow_column);
                    while (id < 40 ) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_column == 4) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }

                    count_red_column = 0;
                    count_yellow_column = 0
                    check_win = $("#6");
                    id = (parseInt(check_win.attr("id")))
                    console.log(check_win);
                    count_red_column = check_red_column(count_red_column, check_win);
                    count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                    // console.log(id);
                    // console.log("red");
                    // console.log(count_red_column);
                    // console.log("yellow");
                    // console.log(count_yellow_column);
                    while (id < 41 ) {
                        check_win = goDown(id);
                        id = parseInt(check_win.attr("id"))
                        console.log(check_win);
                        count_red_column = check_red_column(count_red_column, check_win);
                        count_yellow_column = check_yellow_column(count_yellow_column, check_win);
                        if (count_red_column == 4) {
                            alert("le joueur rouge a gagné");
                        }
                        else if (count_yellow_column == 4) {
                            alert("le joueur jaune a gagné");
                        }
                        // console.log(id);
                        // console.log("red");
                        // console.log(count_red_column);
                        // console.log("yellow");
                        // console.log(count_yellow_column);
                    }
                });
           });

                    // win condition_____________________

            function check_red_column(count_red_column, check_win) {
                if (check_win.hasClass("red")) {
                    count_red_column++;
                }
                else {
                    count_red_column= 0;
                }
                if (count_red_column == 4) {
                    return count_red_column;
                }
                return count_red_column;
            }

            function check_yellow_column(count_yellow_column, check_win) {
                if (check_win.hasClass("yellow")) {
                    count_yellow_column++;
                }
                else {
                    count_yellow_column= 0;
                }
                if (count_yellow_column == 4) {
                    return count_yellow_column;
                }
                return count_yellow_column;
            }

            function check_red_line(count_red_line, check_win, id) {

                if (id == 6 ||
                    id == 13 ||
                    id == 20 ||
                    id == 27 ||
                    id == 34) {
                        count_red_line = 0;
                    }
                if (check_win.hasClass("red")) {
                    count_red_line++;
                }
                else {
                    count_red_line = 0;
                }
                if (count_red_line == 4) {
                    return count_red_line;
                }
                return count_red_line;
            }

            function check_yellow_line(count_yellow_line, check_win, id) {
                if (id == 6 ||
                    id == 13 ||
                    id == 20 ||
                    id == 27 ||
                    id == 34) {
                        count_yellow_line = 0;
                    }
                if (check_win.hasClass("yellow")) {
                    count_yellow_line++;
                }
                else {
                    count_yellow_line = 0;
                }
                if (count_yellow_line == 4) {
                    return count_yellow_line;
                }
                return count_yellow_line;
            }

            function goRight(id){
                // let id = parseInt(n);
                if ($("#" + id)) {
                    $("#" +(id+1))
                    return($("#" +(id+1)));
                }
            }

            function goDown(id) {
                if ($("#" + id)) {
                if (id >= 35) {
                    return($("#" + id));
                    // return true;    
                }
                else if ($("#" +(id+7))) {
                    return($("#" +(id+7)));
                    // return true;
                    }
                }
                    return false;
            }

           
            function getNextCell(n) {
                let id = parseInt(n);
                if ($("#" + id)) {
                if (id >= 35) {
                    return($("#" + id));
                    // return true;    
                }
                else if ($("#" +(id+7))) {
                    return($("#" +(id+7)));
                    // return true;
                    }
                }
                return false;
            }
        }
    }

$( document ).ready(function() {

    console.log( "ready!" );

    new Game();
});


