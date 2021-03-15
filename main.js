var firebaseConfig = {
apiKey: "AIzaSyAwlggcWf9sf5fmixCEz6FpVGDBZ7L7eh4",
authDomain: "goi-maps.firebaseapp.com",
projectId: "goi-maps",
storageBucket: "goi-maps.appspot.com",
messagingSenderId: "194857970924",
appId: "1:194857970924:web:dd7439cdbce3909f2389c9",
measurementId: "G-YMLSSHKXJ5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function getDataFrom(path){

  var starCountRef = firebase.database().ref(path);
  var data
  starCountRef.on('value', (snapshot) => {
  const d = snapshot.val();
  data = d

  });
  return data
}

async function getAllFromCol(path){
  var database = await firebase.database().ref(path).get()
  var data = database.val()

  return Promise.resolve(data)

}


function AddData(path, Map, Creator, Length, DownUrl, ID, Vid){
  firebase.database().ref(path+Map+"/").set({
    Creator: Creator,
    Length: Length,
    Download: DownUrl,
    Vid: Vid,
    ID: ID
  })
}





function sortAlphaData(data){

  let values = []
  let names = []

  for (const [key, value] of Object.entries(data)) {

    values.push([key, value["Creator"], value["Length"]])
    names.push(key)
    var h = document.createElement("H1")

    var t = document.createTextNode(key);

    h.appendChild(t)
    document.body.appendChild(h)



    var h = document.createElement("H4")
    var t = document.createTextNode("Creator: "+value["Creator"]);
    h.appendChild(t);
    document.body.appendChild(h)

    var a = document.createElement('a');

    var h = document.createElement("H4")
    var t = document.createTextNode("Length: "+value["Length"]);
    h.appendChild(t);
    document.body.appendChild(h)


    var a = document.createElement('a');

    var link = document.createTextNode("Download");


    a.appendChild(link);

    a.href = value["Download"];

    document.body.appendChild(a);



    if (value["Vid"] != "None"){

      var a = document.createElement('a');

      var link = document.createTextNode("Video Showcase");
      var n = document.createElement("BR");
      var e = document.createElement("BR");


      a.appendChild(link);

      a.href = value["Vid"];
      document.body.appendChild(n);
      document.body.appendChild(e);
      document.body.appendChild(a);


    }
    else{
      var h = document.createElement("H4")
      var t = document.createTextNode("No Video Showcase");
      h.appendChild(t);
      document.body.appendChild(h)
    }

  }
  // names.sort()
  //
  // for (var i = 0;i < names.length;i++){
  //   var nowVal = names[i]
  //   for (var j=0;j<values.length;j++){
  //     if (nowVal == values[j][0]){
  //       var temp = values[j]
  //       values[j] = values[i]
  //       values[i] = temp
  //
  //     }
  //   }
  // }

}


function getMaxIndexId(data){
  var maxs = 0
  for (const [key, value] of Object.entries(data)) {
    if (value["ID"] > maxs){
      maxs = value["ID"]
    }

  }
  return maxs
}

var loginButton


function setup(){


  var data = getAllFromCol("maps/")
  data.then(function(data){
    sortAlphaData(data)
  })


}

setup()
