{"version":3,"file":"js/build/script.min.js","sources":["script.js"],"names":["updateAll","updateCategories","updateItems","updateBasket","addCategories","categories","preparedData","JSON","stringify","category","ajax","url","request","data","catList","document","querySelector","cats","forEach","toLowerCase","innerHTML","filterType","options","filter","populateItems","itemList","its","i","items","item","id","name","desc","cat","price","stock","basket","iconSwap","icons","querySelectorAll","iconSwapLookup","Search","Grid","List","Checkout","icon","hasOwnProperty","className","classList","remove","basketInit","checkoutLink","addEventListener","basketToggle","indexOf","displayOptionInit","displayOptions","getElementById","style","display","j","displayOption","displayOptionToggle","displayOptionType","k","l","changeCheckoutItemAmount","amount","checkoutItemAmount","title","inputOptions","callback","xhr","async","dataType","debug","option","optionValue","console","log","window","XMLHttpRequest","ActiveXObject","open","setRequestHeader","responseType","states","readyState","status","statusText","response","send","filterList","this","value"],"mappings":";AAuHA,QAASA,aACRC,mBACAC,cACAC,eAGD,QAASC,eAAcC,GACtB,GAAIC,GAAeC,KAAKC,WAAYC,SAAUJ,GAE9CK,OAAOC,IAAK,eAAgBC,QAAS,OAAQC,KAAMP,GAAgB,WAClEL,qBAIF,QAASA,oBACR,GAAIa,GAAUC,SAASC,cAAc,cAErCN,OAAOC,IAAK,uBAAyB,SAASE,GAC7C,GAAII,GAAO,EAEXJ,GAAKR,WAAWa,QAAQ,SAAST,GAChCQ,GAAQ,iBAAiBR,EAASU,cAAc,KAAKV,EAAS,cAG/DK,EAAQM,UAAYH,IAWtB,QAASf,aAAYmB,GAEpB,GAAIC,KACJA,GAAQX,IAAM,iBAEXU,IACFC,EAAQV,QAAU,OAClBU,EAAQT,KAAON,KAAKC,WAAYe,OAAQF,KAGzCX,KAAKY,EAAS,SAAST,GACtBW,cAAcX,KAIhB,QAASW,eAAcX,GACtB,GAAIY,GAAWV,SAASC,cAAc,SACtCS,GAASL,UAAY,EAErB,IAAIM,GAAM,EAEV,KAAI,GAAIC,KAAKd,GAAKe,MAAM,CACvB,GAAIC,GAAOhB,EAAKe,MAAMD,EAEtBD,IACA,gDAC2BG,EAAKC,GAAG,uBAAuBD,EAAKE,KAAK,8DAGpDF,EAAKE,KAAK,4BAA4BF,EAAKE,KAAK,MAAMF,EAAKE,KAAK,oCAEnDF,EAAKG,KAAK,uEAGFH,EAAKI,IAAI,0CAE9BJ,EAAKE,KAAK,4BAA4BF,EAAKE,KAAK,MAAMF,EAAKK,MAAM,oCAEnDL,EAAKM,MAAM,wBAM1CV,EAASL,UAAYM,EAGtB,QAASvB,gBACR,GAAIiC,GAASrB,SAASC,cAAc,gBACpCN,OAAOC,IAAK,oBAAsB,SAASE,GAE1C,IAAI,GAAIc,KAAKd,GAAKe,MAAM,CACvB,GAAIC,GAAOhB,EAAKe,MAAMD,EAEtBS,GAAOhB,WACP,gDAC2BS,EAAKC,GAAG,uBAAuBD,EAAKE,KAAK,8DAGpDF,EAAKE,KAAK,4BAA4BF,EAAKE,KAAK,MAAMF,EAAKE,KAAK,oCAEnDF,EAAKG,KAAK,0CAEvBH,EAAKE,KAAK,4BAA4BF,EAAKE,KAAK,MAAMF,EAAKK,MAAM,yBAWpF,QAASG,YAGR,GAAIC,GAAQvB,SAASwB,iBAAiB,cAElCC,GACHC,OAAU,SACVC,KAAQ,WACRC,KAAQ,UACRC,SAAY,gBAGb,KAAI,GAAIjB,KAAKW,GAAM,CAClB,GAAIO,GAAOP,EAAMX,EAGjB,IAAGkB,EAAKC,eAAe,aAAa,CAGnC,GAAIC,GAAYP,EAAeK,EAAKzB,UACpCyB,GAAKzB,UAAY,mBAAmB2B,EAAU,SAG9CF,EAAKG,UAAUC,OAAO,eAQzB,QAASC,cACR,GAAIC,GAAepC,SAASC,cAAc,YAC1CmC,GAAaC,iBAAiB,QAASC,cAAc,GAGtD,QAASA,gBACR,GAAIF,GAAepC,SAASC,cAAc,aACtCoB,EAASrB,SAASC,cAAc,UAEK,KAAtCoB,EAAOW,UAAUO,QAAQ,WAC3BH,EAAaJ,UAAY,wBACzBX,EAAOW,UAAY,WAEnBI,EAAaJ,UAAY,WACzBX,EAAOW,UAAY,wBAKrB,QAASQ,qBACR,GAAIC,GAAiBzC,SAASwB,iBAAiB,kBAG/CxB,UAAS0C,eAAe,6BAA6BC,MAAMC,QAAU,MAErE,KAAI,GAAIC,KAAKJ,GAAe,CAC3B,GAAIK,GAAgBL,EAAeI,EAEhCC,GAAcf,eAAe,cAC/Be,EAAcT,iBAAiB,QAASU,qBAAqB,IAOhE,QAASA,uBACR,GAAIN,GAAiBzC,SAASwB,iBAAiB,mBAC3CX,EAAQb,SAASwB,iBAAiB,aAClCwB,EAAoB,MAExB,KAAI,GAAIC,KAAKR,GAAe,CAC3B,GAAIK,GAAgBL,EAAeQ,EAEhCH,GAAcf,eAAe,eACI,KAAhCe,EAAcH,MAAMC,SACtBE,EAAcH,MAAMC,QAAU,OAC9BI,EAAoB,SAEpBA,EAAoB,OACpBF,EAAcH,MAAMC,QAAU,KAKjC,IAAI,GAAIM,KAAKrC,GAAM,CAClB,GAAIC,GAAOD,EAAMqC,EAEdpC,GAAKiB,eAAe,eACtBjB,EAAKkB,UAAY,QAAQgB,IAM5B,QAASG,0BAAyBC,GACjC,GAAIC,GAAqBrD,SAASC,cAAc,wBAE7CmD,GAAS,GACXC,EAAmBhD,UAAY+C,EAC/BC,EAAmBC,MAAQ,YAAYF,EAAO,sBAE9CC,EAAmBhD,UAAY,EAC/BgD,EAAmBC,MAAQ,yBAGzBF,GAAU,MACZC,EAAmBhD,UAAY,OAC/BgD,EAAmBC,MAAQ,2BAA2BF,EAAO,eAvT/D,GAAIzD,MAAO,SAAS4D,EAAcC,GAEjC,GAAIC,GACJlD,GAECV,QAAS,MACTD,IAAK,KACL8D,OAAO,EACPC,SAAU,OACV7D,KAAM,KACN8D,OAAO,EAKR,KAAI,GAAIC,KAAUN,GAAa,CAC9B,GAAIO,GAAcP,EAAaM,EAE/B,QAAOA,GACN,IAAK,UAAWtD,EAAQV,QAAUiE,CAAa,MAC/C,KAAK,MAAOvD,EAAQX,IAAMkE,CAAa,MACvC,KAAK,QAASvD,EAAQmD,MAAQI,CAAa,MAC3C,KAAK,WAAYvD,EAAQoD,SAAWG,CAAa,MACjD,KAAK,OAAQvD,EAAQT,KAAOgE,CAAa,MACzC,KAAK,QAASvD,EAAQqD,MAAQE,CAAa,MAC3C,SAASvD,EAAQqD,OAASG,QAAQC,IAAI,4BAKxC,MAAIzD,GAAQX,KAKTqE,OAAOC,eACTT,EAAM,GAAIS,gBACFD,OAAOE,gBACfV,EAAM,GAAIU,eAAc,mBAGrBV,GAKHlD,EAAQqD,OAASG,QAAQC,IAAI,0BAE7BP,EAAIW,KAAK7D,EAAQV,QAASU,EAAQX,IAAKW,EAAQmD,OAE/CD,EAAIY,iBAAiB,eAAgB,qCACrCZ,EAAIY,iBAAiB,mBAAoB,kBAEtC9D,EAAQoD,WACVF,EAAIa,aAAe/D,EAAQoD,UAG5BF,EAAIpB,iBAAiB,mBAAoB,WAExC,GAAIkC,IAAU,gBAAiB,UAC5B,SAAU,cAAe,WAK5B,IAHAhE,EAAQqD,OAASG,QAAQC,IAAI,SAAUO,EAAOd,EAAIe,YAAaf,EAAIe,YAG9C,GAAlBf,EAAIe,aACNjE,EAAQqD,OAASG,QAAQC,IAAI,UAAWP,EAAIgB,OAAQ,IAAIhB,EAAIiB,WAAW,IAAK,OAAOnE,EAAQX,IAAI,KAC9E,KAAd6D,EAAIgB,QAAc,CACpBlE,EAAQqD,OAASG,QAAQC,IAAI,UAC7B,IAAIW,GAAWlB,EAAIkB,QAEnBnB,GAASmB,MAMZlB,EAAImB,KAAK,QAAQrE,EAAQT,MACzBS,EAAQqD,OAASG,QAAQC,IAAI,cAAezD,EAAQT,MAhCpDS,SAJAA,EAAQqD,OAASG,QAAQC,IAAI,6CACtB,KAZPzD,EAAQqD,OAASG,QAAQC,IAAI,0BACtB,KAoDT,WACC1C,WAEAkB,oBACAL,aAEAlD,cAgCD,IAAI4F,YAAa7E,SAASC,cAAc,iBAExC4E,YAAWxC,iBAAiB,SAAU,WACrClD,YAAY2F,KAAKC"}