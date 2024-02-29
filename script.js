

// start variable area coding:

var budget_btn = document.getElementById("budget-btn");
var budget = document.getElementById("budget");
var t_budget = document.getElementById("total-budget");
var product_btn = document.getElementById("product-btn");
var title =document.getElementById("title");
var cost = document.getElementById("cost")
var expece_list = document.getElementById("expence-list");
var expance = document.getElementById("expence");
var balance = document.getElementById("balance");



// end variable area coding:



// start budget in localstorage:

budget_btn.onclick = function(e){
   e.preventDefault();
   if(budget.value != ""){
        localStorage.setItem("budget",budget.value);
        location.href = location.href;
   }else{
    alert("Budget is empty!")
   }
}
// store product in localStorage:

product_btn.onclick = function(e){
   e.preventDefault();
   if(title.value != "" && cost.value != ""){
    var p_title = title.value;
    var p_cost = cost.value;
    var data = {
        p_cost : p_cost,
        p_title : p_title
    };
    var string = JSON.stringify(data);
    localStorage.setItem("budget_"+ title.value,string);
    location.href = location.href;

   }else{
    alert("Field is empty!")
   }
}

// retrive data from localStorage:

function all_data(){
    var i;
    for(i=0;i<localStorage.length;i++){
        var all_keys = localStorage.key(i);
       if(all_keys.match("budget_")){
        var json_data = localStorage.getItem(all_keys);
        var json_parse = JSON.parse(json_data);
         expece_list.innerHTML += '<div class="row mt-3 mb-3 b-border"><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>'+json_parse.p_title+'</h5><h5 class="price">'+json_parse.p_cost+'</h5></div><div  class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa fa-edit edit-btn"></i> &nbsp;&nbsp;&nbsp; <i class="fa fa-trash delete-btn"></i></div></div>';
        
       }
    }

    var price_tag = document.getElementsByClassName("price");
    var price = [];
    for(i=0;i<price_tag.length;i++){
        price[i] = price_tag[i].innerHTML;
    }
    
    var price_int = [];
    for(i=0;i<price.length;i++){
        price_int.push(parseInt(price[i]));
    }
      var final_price = 0;
      for(i=0;i<price_int.length;i++){
        final_price += price_int[i];
      }
      expance.innerHTML = final_price;

      t_budget.innerHTML = localStorage.getItem("budget")
      var t_bgt = t_budget.innerHTML;
     var t_expence = expance.innerHTML;
     balance.innerHTML = t_bgt - t_expence;


    //  start delete coding:
    var delete_btn = document.getElementsByClassName("delete-btn");
    for(i=0;i<delete_btn.length;i++){
        delete_btn[i].onclick = function(){
           
            var cnf = window.confirm("Do You wanna to Delete it?")
            if(cnf){
                var del_parent = this.parentElement;
                var div_parent = del_parent.parentElement;
                var h5 = div_parent.firstChild.childNodes[0].innerHTML;
                localStorage.removeItem("budget_" + h5);
                location.href = location.href;
            }
            else{
                alert("Your data is safe :");
            }
          }
      }

    //   start edit coding :

    var edit_btn = document.getElementsByClassName("edit-btn");
     for(i=0;i<edit_btn.length;i++){
        edit_btn[i].onclick = function(){
            var cnf = window.confirm("Do you wanna update it?")
            if(cnf == true){
                var edit_parant = this.parentElement;
                var col_parent = edit_parant.parentElement;

                var h5_data = col_parent.firstChild.childNodes[0].innerHTML;
                var h5_price = col_parent.firstChild.childNodes[1].innerHTML;
                
                title.value = h5_data;
                cost.value = h5_price;
                title.focus();
                product_btn.innerHTML = "Update your data";
                product_btn.style.backgroundColor = "red";


                product_btn.onclick = function(){
                    localStorage.removeItem("budget_"+h5_data);
                    var p_title = title.value;
                    var p_cost = cost.value;
                    var data = {
                    p_cost : p_cost,
                    p_title : p_title
                 };
                    var string = JSON.stringify(data);
                    localStorage.setItem("budget_"+ title.value,string);
                    location.href = location.href;
                }

            }
            else{
                alert("Your data is safe!")
            }
        }
     }     
}
all_data();