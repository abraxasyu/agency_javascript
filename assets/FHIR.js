var FHIR_json = $.getJSON("https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=8310-5",function(){
    var FHIR_temp=FHIR_json.responseJSON.entry[0].resource.valueQuantity.value;
    var FHIR_subject=FHIR_json.responseJSON.entry[0].resource.subject.display;
    var FHIR_g = new JustGage({//http://justgage.com/
    id: "FHIR", //id here has to match div id
    value: FHIR_temp,
    min: 0,
    max: 100,
    title: "FHIR JustGage: "+FHIR_subject,
    label: "celsius",
    //reverse:"true"
    //settings:https://github.com/toorshia/justgage/blob/master/justgage.js#L129
    });
  });
