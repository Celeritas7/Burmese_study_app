import { useState, useMemo } from "react";

const CONS = [{"id":1,"b":"က","r":"ka","h":7,"wc":72},{"id":2,"b":"ခ","r":"kha","h":2,"wc":1},{"id":5,"b":"င","r":"nga","h":2,"wc":12},{"id":13,"b":"ဈ","r":"zha","h":1,"wc":0},{"id":22,"b":"တ","r":"ta","h":3,"wc":5},{"id":23,"b":"ထ","r":"tha","h":1,"wc":16},{"id":24,"b":"သ","r":"tha","h":4,"wc":9},{"id":25,"b":"ဒ","r":"da","h":1,"wc":0},{"id":27,"b":"န","r":"na","h":1,"wc":11},{"id":28,"b":"ပ","r":"pa","h":3,"wc":10},{"id":31,"b":"ဘ","r":"bha","h":8,"wc":23},{"id":32,"b":"မ","r":"ma","h":7,"wc":30},{"id":34,"b":"ရ","r":"ra","h":4,"wc":8},{"id":35,"b":"လ","r":"la","h":4,"wc":18},{"id":36,"b":"ဝ","r":"wa","h":1,"wc":0},{"id":38,"b":"စ","r":"sa","h":1,"wc":8},{"id":39,"b":"ဆ","r":"sa","h":1,"wc":6},{"id":41,"b":"ဟ","r":"ha","h":4,"wc":12},{"id":43,"b":"အ","r":"a","h":6,"wc":25}];
const HUBS = [{"id":1,"w":"အရောင်များ","m":"Colours","c":43,"g":"Colours-1","ch":[]},{"id":2,"w":"တိရစ္ဆာန်များ","m":"Animals","c":22,"g":"Animals-1","ch":[]},{"id":3,"w":"သိုး","m":"Food","c":24,"g":"Food-1","ch":[]},{"id":4,"w":"အသီးအရွက်","m":"Vegetables","c":43,"g":"Vegetables-1","ch":[]},{"id":5,"w":"သစ်သီးများ","m":"Fruits","c":24,"g":"Fruits-1","ch":[]},{"id":6,"w":"မိုဘိုင်း","m":"Transportation","c":32,"g":"Transportation-1","ch":[]},{"id":7,"w":"ဈေးဝယ်ထွက်","m":"Shopping","c":13,"g":"Shopping-1","ch":[]},{"id":8,"w":"ဟိုတယ်","m":"Hotel","c":41,"g":"Hotel-1","ch":[]},{"id":9,"w":"ခန္ဓာကိုယ်","m":"Body","c":2,"g":"Body-1","ch":[]},{"id":10,"w":"ရက်စွဲ","m":"Date","c":34,"g":"Date-1","ch":[]},{"id":11,"w":"မိသားစု","m":"Family","c":32,"g":"Family-1","ch":[]},{"id":12,"w":"ဦးတည်ချက်","m":"Directions","c":22,"g":"Directions-1","ch":[]},{"id":13,"w":"ရာသီဥတု","m":"The season","c":34,"g":"Weather-1","ch":[]},{"id":14,"w":"ဝါသနာ","m":"Hobby","c":36,"g":"Hobby-1","ch":[]},{"id":15,"w":"ပန်းကန်ခွက်ယောက်","m":"Tableware","c":28,"g":"Tableware-1","ch":[]},{"id":16,"w":"ဟင်းခတ်အနှစ်","m":"Seasoning","c":41,"g":"Seasoning-1","ch":[]},{"id":17,"w":"အားကစား","m":"Sport","c":43,"g":"Sports-1","ch":[]},{"id":18,"w":"သောက်ပါ။","m":"Drink","c":24,"g":"Drinks-1","ch":[]},{"id":19,"w":"ပါ","m":"(spelled as \"pa2\".) polite ending word with emphasis","c":28,"g":"LESSON - 2A","ch":[{"w":"ပါတယ်","e":"affirmation in the answer."}]},{"id":21,"w":"ဘာလဲ","m":"What? What did you say?","c":31,"g":"WHAT","ch":[{"w":"ဘာလိုချင်လဲ","e":"What do you want?"},{"w":"ဘာလုပ်ချင်လဲ","e":"What do you want to do?"},{"w":"ကြ","e":"plural form of people"},{"w":"ဘာလုပ်ကြမလဲ","e":"What shall we do?"},{"w":"ဘာစားကြမလဲ","e":"What shall we eat?"},{"w":"ဒါဘာလဲ","e":"What is this?"}]},{"id":28,"w":"ဘာဖြစ်လို့လဲ","m":"Why? What's the matter?","c":31,"g":"WHY","ch":[{"w":"ဘာကြောင့်လဲ","e":"Why? What's the reason behind this?"}]},{"id":30,"w":"ဘယ်တောလာမလဲ","m":"When will you come?","c":31,"g":"WHEN","ch":[]},{"id":34,"w":"ဆရာ","m":"teacher; master of a trade","c":39,"g":"WHO","ch":[{"w":"ဘယ်သူလဲ","e":"Who?"},{"w":"သူပဲ","e":"That's him! (spelled as \"peare3\")"},{"w":"စာရေးဆရာ","e":"a writer"},{"w":"ဆရာတော်","e":"(spelled as \"tau2\") Venerable Monk"},{"w":"ဆရာမ","e":"madam; female teacher"},{"w":"ဆိုက်ကားဆရာ","e":"trishaw driver"}]},{"id":38,"w":"ဘယ်ဟာလဲ","m":"Which one?","c":31,"g":"WHICH","ch":[{"w":"ဒါပဲ","e":"This is the one! / That's it!"},{"w":"ဒါလိုချင်တယ်","e":"I want this one!"}]},{"id":41,"w":"ဘယ်နှယောက်လဲ","m":"How many people?","c":31,"g":"HOW MANY","ch":[]},{"id":42,"w":"ဘယ်လောက်လဲ","m":"How much?","c":31,"g":"HOW MUCH","ch":[{"w":"ဘယ်လောက်လိုချင်လဲ","e":"How much (do you) want?"},{"w":"ဒီလောက်","e":"This much"},{"w":"ဒီလာက်လိုတယ်","e":"I need this much"},{"w":"ဒီလောက်လိုချင်တယ်","e":"I want this much"}]},{"id":47,"w":"ဘယ်လိုလဲ","m":"How is it going?","c":31,"g":"HOW","ch":[{"w":"ဒီလိုပဲ","e":"So, so… (Lit: \"Just like this\")"},{"w":"ဘယ်လိုလုပ်ကြမလဲ","e":"What shall we do? (How to proceed?)"},{"w":"ဘယ်လိုသွားကြမလဲ","e":"How shall we go?"}]},{"id":51,"w":"ဘယ်လဲ","m":"Go where? Where to?","c":31,"g":"WHERE","ch":[{"w":"ဘယ်ကပြန်လာလဲ","e":"Come back from where?"},{"w":"နင်ဘယ်မလဲ","e":"Where are you?"},{"w":"ဘယ်မှာလဲ","e":"Where is it? (where at?)"},{"w":"ဒီမှာ","e":"Here!"},{"w":"ဟိုမှာ","e":"There!"},{"w":"ဘယ်သွားချင်လဲ","e":"Where do you want to go?"},{"w":"ဘယ်သွားကြမလဲ","e":"Where shall we go?"}]},{"id":59,"w":"လား","m":"\" ? \" at the end of the sentence","c":35,"g":"SENTENCE PATTERNS","ch":[{"w":"ပြီ","e":"has reached certain stage"},{"w":"ပြီလား","e":"reached certain stage?"},{"w":"မ - ဘူး","e":"no"},{"w":"မ - တော့ဘူး","e":"no longer (want or do something)"},{"w":"မ - သေးဘူး","e":"not yet (want or do something)"},{"w":"ရဲ့","e":"the word to show concern"}]},{"id":66,"w":"ခက်လား","m":"Difficult?","c":2,"g":"EASY / DIFFICULT","ch":[{"w":"လွယ်လား","e":"Easy?"}]},{"id":68,"w":"လိုလား","m":"Do you need it?","c":35,"g":"NEEDS","ch":[{"w":"လိုတယ်","e":"Yes, I need it"},{"w":"မလိုဘူး","e":"No need"},{"w":"မလိုသေးဘူး","e":"I don't need it yet"},{"w":"မလိုတော့ဘူး","e":"I no longer need it"}]},{"id":73,"w":"လိုချင်လား","m":"Do you want it?","c":35,"g":"WANTS","ch":[{"w":"လိုချင်တယ်","e":"I want it"},{"w":"မလိုချင်တော့ဘူး","e":"I no longer want it"}]},{"id":76,"w":"လောက်လား","m":"Do you have enough?","c":35,"g":"TO BE ENOUGH","ch":[{"w":"လောက်တယ်","e":"Yes"},{"w":"မလောက်ဘူး","e":"No, not enough"},{"w":"လောက်ပြီလား","e":"Is that enough already?"},{"w":"လောက်ပြီ","e":"Yes"},{"w":"မလောက်သေးဘူးလား","e":"Still no t enough?"},{"w":"မလောက်သေးဘူး","e":"No. / Still not enough"}]},{"id":83,"w":"မလုပ်ချင်တော့ဘူး","m":"I don't want to do it anymore","c":32,"g":"DO","ch":[{"w":"မလုပ်တော့ဘူး","e":"I am no longer doing it"}]},{"id":85,"w":"ကုန်ပြီလား","m":"Used/eaten up already?","c":1,"g":"USED UP","ch":[{"w":"ကုန်ပြီ","e":"Used/eaten up already"},{"w":"မကုန်သေးဘူးလား","e":"Haven't used/eaten up yet?"},{"w":"မကုန်သေးဘူး","e":"Not yet"}]},{"id":89,"w":"ရောက်","m":"to reach the destination","c":34,"g":"REACHED DESTINATION","ch":[{"w":"ရောက်ပြီ","e":"We are there"},{"w":"ရောက်ပြီလား","e":"Are we there yet?"},{"w":"မရောက်သေးဘူးလား","e":"Are we not there yet?"},{"w":"မရောက်သေးဘူး","e":"We are not there yet"}]},{"id":94,"w":"ရ","m":"to obtain; to be ready; to be available","c":34,"g":"BE AVAILABLE / BE READY","ch":[{"w":"ရပြီ","e":"Yes, got it!"},{"w":"ရပြီလား","e":"Have you got it? Is it ready?"},{"w":"မရသေးဘူးလား","e":"Haven't got it yet? Not ready yet?"},{"w":"မရသေးဘူး","e":"No. / Haven't got it yet. Not ready yet."}]},{"id":99,"w":"မပြီးသေးဘူးလား","m":"Haven't you done it yet?","c":32,"g":"DONE","ch":[{"w":"မပြီးသေးဘူး","e":"No / Haven't finished yet"},{"w":"ပြီးပြီလား","e":"Finished already?"},{"w":"ပြီးပြီ","e":"Done! It's over!"}]},{"id":103,"w":"စား","m":"eat","c":38,"g":"HAVE YOUR MEAL","ch":[{"w":"စားပြီးပြီလား","e":"eaten already?"},{"w":"စားပြီးပြီ","e":"I am done eating, eaten already (eat + done)"},{"w":"စားကောင်းရဲ့လား","e":"How was the food?, Delicious?"},{"w":"သိပ်ကောင်းတာပဲ","e":"It was very good!"},{"w":"မစားရသေးဘူးလား","e":"Haven't you eaten yet?"},{"w":"မစားရသေးဘူး","e":"No, I haven't eaten yet"},{"w":"မစားချင်တော့ဘူး","e":"I don't want to eat it anymore"},{"w":"မစားတော့ဘူး","e":"I am not going to eat"}]},{"id":112,"w":"သွားမလား","m":"GO","c":24,"g":"GO","ch":[{"w":"မသွားဘူး","e":""},{"w":"သွားမယ်","e":""},{"w":"သွားဦးမယ်နော်","e":""},{"w":"သွားချင်လား","e":""},{"w":"သွားချင်တယ်","e":""},{"w":"မသွားချင်ဘူး","e":""},{"w":"မသွားချင်သေးဘူး","e":""},{"w":"မသွားချင်တော့ဘူး","e":""},{"w":"မသွားတော့ဘူး","e":""}]},{"id":122,"w":"ဟုတ်","m":"AFFIRMATIVE","c":41,"g":"AFFIRMATIVE","ch":[{"w":"ဟုတ်ပါတယ်","e":""},{"w":"ဟုတ်တယ်","e":""},{"w":"ဟုတ်လား","e":""},{"w":"ဟုတ်ပါ့ဟုတ်ပါ့","e":""},{"w":"ဟုတ်ရဲ့လား","e":""},{"w":"ဟုတ်ကဲ့","e":""},{"w":"မဟုတ်ဘူး","e":""},{"w":"မဟုတ်သေးဘူး","e":""}]},{"id":131,"w":"ကောင်း","m":"GOOD","c":1,"g":"GOOD","ch":[{"w":"ကောင်းပါတယ်","e":""},{"w":"ကောင်းပါတယ်လေ","e":""},{"w":"ကောင်းပြီလေ","e":""},{"w":"ကောင်းတယ်","e":""},{"w":"ကောင်းလား","e":""},{"w":"ကောင်းရဲ့လား","e":""}]},{"id":140,"w":"နေကောင်း","m":"GREETINGS","c":27,"g":"GREETINGS","ch":[{"w":"မင်္ဂလာပါ","e":""},{"w":"နေထိုင်","e":""},{"w":"နေကောင်းကြလား","e":""},{"w":"နေကောင်းကြရဲ့လား","e":""},{"w":"နေကောင်းကြပါတယ်","e":""},{"w":"တွေ့","e":""},{"w":"တွေ့ရတာ","e":""},{"w":"ဝမ်းသာ","e":""},{"w":"တွေ့ရတာဝမ်းသာပါတယ်","e":""},{"w":"ကျေးဇူး","e":""},{"w":"ကျေးဇူးတင်ပါတယ်","e":""}]},{"id":150,"w":"ဟုတ်တာပေါ့","m":"LESSON 2B: PART 1","c":41,"g":"LESSON 2B: PART 1","ch":[{"w":"ဦးလးတင်အတွက်လက်ဆောင်","e":""},{"w":"ရပါတယ်","e":""},{"w":"ကျွန်တော်စမ်းကြည့်မယ်","e":""},{"w":"လွယ်ပါတယ်","e":""}]},{"id":155,"w":"ကြိုက်တယ်","m":"PART 2","c":1,"g":"PART 2","ch":[{"w":"မဆိုးပါဘူး","e":""},{"w":"ဘယ်ဟုတ်ပါ့မလဲ","e":""},{"w":"တစ်ခါတလေမှပါ","e":""},{"w":"ကိစ္စမရှိပါဘူး","e":""},{"w":"နေပါစေတော့","e":""}]},{"id":161,"w":"မိုက်တယ်ကွ","m":"PART 3","c":32,"g":"PART 3","ch":[{"w":"ဟော့တယ်ဟေ့","e":""},{"w":"ဘယ်လိုထင်လဲ","e":""},{"w":"မဖြစ်နိုင်ပါဘူး","e":""},{"w":"သြော်ဟုတ်လား","e":""}]},{"id":166,"w":"ဒါဘယ်သူနဲ့လဲ","m":"PART 4","c":25,"g":"PART 4","ch":[]},{"id":167,"w":"မုန့်ဟင်းခါး","m":"Rice Noodle with Fish Gravy","c":32,"g":"Burmese Favourite","ch":[{"w":"ဘူးသီးကြော်","e":"Fried melon"},{"w":"ပဲကက်ကြော်","e":"Fried (fritter) yellow split pea"},{"w":"ပုစွန်ကက်ကြော်","e":"Fried (fritter) shrimp"},{"w":"ကြက်သွန်ကြော်","e":"Fried Onion"},{"w":"ငါးဖယ်ကြော်","e":"Fried Featherback"},{"w":"ဘဲဥပြုတ်","e":"Boiled Duck Egg"},{"w":"နံနံပင်","e":"Cilantro (Parsley)"},{"w":"ငရုတ်သီးမှုန့်","e":"Chilli Powder"},{"w":"ကြက်သွန်နီ","e":"Onion"},{"w":"သံပရာသီး","e":"Lime"},{"w":"ဆီချက်","e":"Fried Onion or Garlic in Oil"}]},{"id":179,"w":"ကောက်ညှင်းပေါင်း","m":"Steamed Glutinous Rice","c":1,"g":"Various cuisines","ch":[{"w":"ပဲပြုတ်","e":"Boiled Pea"},{"w":"နံပြား","e":"Flat Round Indian Bread"},{"w":"အီကြာကွေး","e":"Fried Rice Dough Stick"},{"w":"ခေါပုတ်","e":"Grounded Glutinous Rice"},{"w":"ခေါက်ဆွဲပြုတ်","e":"Noodle Soup"},{"w":"ဝက်သားပေါင်း","e":"Dim Sum (Steamed Pork)"},{"w":"ပေါက်စီ","e":"Chinese “baozi”; Dumpling"},{"w":"ပေါင်မုန့်","e":"Bread"},{"w":"ပေါင်မုန့်မီးကင်","e":"Toast"},{"w":"ပေါင်မုန့်ကြော်","e":"French Toast"},{"w":"ကြက်ဥခေါက်ကြော်","e":"Omelet"},{"w":"ကြက်ဥပြုတ်","e":"Boiled egg"},{"w":"ကြက်ဥပြုတ်မကျက်တကျက်","e":"Half-boiled egg"}]},{"id":193,"w":"မုန့်ဆီကြော်","m":"Burmese Fried Rice Pancake","c":32,"g":"Snacks","ch":[{"w":"မုန့်ဖက်ထုပ်","e":"Glutinous Rice with Sweet Stuffing"},{"w":"မုန့်လက်ကောက်","e":"Burmese Donut"},{"w":"မုန့်စိမ်းပေါင်း","e":"Steamed Rice Cake"},{"w":"ငှက်ပျောသီးကြော်","e":"Fried Banana"},{"w":"ဗယာကြော်","e":"Fried Yellow Split Pea"},{"w":"ဘိန်းမုန့်","e":"Rice Pancake with Poppy Seeds"},{"w":"လမုန့်","e":"Mooncake"},{"w":"နှမ်းပျစ်","e":"Sesame Brittle"},{"w":"နံကထိုင်","e":"Sweet Indian Pastry with butter smell"},{"w":"ကန်စွန်းဥပြုတ်","e":"Boiled Sweet Potato"},{"w":"ပြောင်းဖူးပြုတ်","e":"Boiled Corn"}]},{"id":205,"w":"အမြည်း","m":"Appetizer","c":43,"g":"Appetizers","ch":[{"w":"စမူဆာ","e":"Samusa (Indian stuffed food)"},{"w":"အာလူးကြော်","e":"Potatoes (fries or chips)"},{"w":"ကော်ပြန့်ကြော်","e":"Spring Rolls"},{"w":"ဝက်သားလုံးကြော်","e":"Fried Minced Pork Balls"},{"w":"ဝက်အူချောင်းကြော်","e":"Chinese Sausage"},{"w":"ဆတ်သားခြောက်ကြော်","e":"Dried & Fried Venison"},{"w":"ကြက်သားလုံးကြော်","e":"Fried Minced Chicken Balls"},{"w":"ကြက်သားသုပ်","e":"Chicken Salad"},{"w":"ပုစွန်ကြော်","e":"Fried Prawns"},{"w":"ငါးရှဥ့်ကြော်","e":"Crispy Hot (fried) Eel"},{"w":"ငါးသလဲထိုးကြော်","e":"Fried Loach"},{"w":"ငါးကင်","e":"Grilled Fish"},{"w":"ငါးမုန့်","e":"Fried Crispy Fish Flakes"},{"w":"လက်ဖက်သုပ်","e":"Fermented Tea Salad"},{"w":"မြေပဲလှော်","e":"Roasted Peanut"}]},{"id":221,"w":"ထမင်း","m":"Plain Rice","c":23,"g":"Rice, Noodles","ch":[{"w":"ကြက်သားဆန်ပြုတ်","e":"Rice Porridge with Chicken"},{"w":"ကြေးအိုး","e":"Hot pot"},{"w":"ဒံပေါက်ထမင်း","e":"Biryani Rice"},{"w":"ကြက်သားပလာတာ","e":"Parata (Indian) with chicken"},{"w":"ဆီထမင်း","e":"Steamed rice, vegetables and meat"},{"w":"အုန်းထမင်း","e":"Rice steamed with coconut"},{"w":"ထောပတ်ထမင်း","e":"Rice fried with butter"},{"w":"ထမနဲ","e":"Glutinous Rice (1 month only)"},{"w":"ထမင်းသုပ်","e":"Rice and Vegetable Salad"},{"w":"ထမင်းကြော်","e":"Fried Rice"},{"w":"ကြာဆံကြော်","e":"Rice Noodle"},{"w":"မုန့်တီ","e":"Rice Noodle in thin Fish Gravy"},{"w":"အုန်းနို့ ခေါက်ဆွဲ","e":"Noodle with Chicken Coconut Gravy"},{"w":"နန်းကြီးသုပ်","e":"Noodle Salad with Chicken"},{"w":"ခေါက်ဆွဲသုပ်","e":"Noodle Salad"},{"w":"တို့ဟူးသုပ်","e":"Soya-Bean Cake Salad"}]},{"id":238,"w":"ကြက်သားဒံပေါက်","m":"Chicken Biryani","c":1,"g":"Chicken & Duck (Lunch, Dinner)","ch":[{"w":"ဘဲကင်","e":"(Peking) Roasted Duck"},{"w":"ကြက်ကင်","e":"Roasted Chicken"},{"w":"ကြက်အစိမ်းကြော်","e":"Fried Vegetables with Chicken"},{"w":"ကြက်ကြော်","e":"Fried Chicken"},{"w":"ကုန်းဘောင်ကြီးကြော်","e":"Gongbao Diced Chicken"},{"w":"ကြက်အသည်းအမြစ်ဟင်း","e":"Curry Chicken liver, gizzard, & heart"},{"w":"ကြက်သားအာလူးဟင်း","e":"Curry Chicken and Potatoes"}]},{"id":246,"w":"အမဲသားဟင်း","m":"Stewed Beef Curry","c":43,"g":"Beef & Mutton (Lunch, Dinner)","ch":[{"w":"အမဲကလီစာဟင်း","e":"Beef Intestine & Liver Curry"},{"w":"အမဲသားနှပ်","e":"Braised Beef"},{"w":"ဆိတ်သားဟင်း","e":"Mutton Curry"}]},{"id":250,"w":"တောက်တောက်ကြော်","m":"Fried Sweet & Sour Minced Pork","c":22,"g":"Pork (Lunch, Dinner)","ch":[{"w":"ဝက်နံရိုးကင်","e":"Barbecue Pork Spare Ribs"},{"w":"ချိုချဉ်ကြော်","e":"Sweet & Sour Pork"},{"w":"ဝက်အစိမ်းကြော်","e":"Fried Vegetables with Pork"},{"w":"ဝက်သားမျှစ်ချဉ်ဟင်း","e":"Pork with Sour Bamboo shoots"},{"w":"ဝက်သားဟင်း","e":"Curry Pork"}]},{"id":256,"w":"ငါးဟင်း","m":"Fish Curry","c":5,"g":"Seafood (Lunch, Dinner)","ch":[{"w":"ငါးသလောက်ပေါင်း","e":"Steamed Hilsa"},{"w":"ငါးဆုပ်ကြော်","e":"Fried Fishballs"},{"w":"ငါးမုတ်ကြော်","e":"Fried Pomfret"},{"w":"ငါးချိုချဉ်ကြော်","e":"Sweet & Sour Fish"},{"w":"ပုစွန်ဟင်း","e":"Prawn Curry"},{"w":"ကဏန်းပေါင်း","e":"Steamed Crab"},{"w":"ပုစွန်တုပ်ဟင်း","e":"Chilli Lobster"},{"w":"ပြည်ကြီးငါးကြော်","e":"Fried Squid"}]},{"id":265,"w":"ငါးပိကြော်","m":"Fried Shrimp Paste","c":5,"g":"Sauce and Side Dishes","ch":[{"w":"ငါးပိရည်","e":"Shrimp Paste Sauce"},{"w":"ငါးပိထောင်း","e":"Baked and grinded shrimp paste"},{"w":"ပဲပုပ်","e":"Fermented Soya Bean"},{"w":"အချဉ်ရည်","e":"Catchup"}]},{"id":270,"w":"အစိမ်းကြော်","m":"Fried Vegetables","c":43,"g":"Vegetables (Lunch, Dinner)","ch":[{"w":"ကန်စွန်းရွက်ကြော်","e":"Fried Watercress"},{"w":"မှိုကန်စွန်းကြော်","e":"Fried Watercress with Mushroom"},{"w":"ချဉ်ပေါင်ကြော်","e":"Fried Roselle"},{"w":"ကိုက်လန်ကြော်","e":"Fried Kailan / Gailan"},{"w":"ပဲပင်ပေါက်ပဲပြားကြော်","e":"Fried Bean Sprouts and Bean Curds"},{"w":"မျှစ်ကြော်","e":"Fried Bamboo Shoots"},{"w":"ကညွတ်ကြော်","e":"Fried Asparagus"}]},{"id":278,"w":"ကြာဆံဟင်းခါး","m":"Vermicelli Soup","c":1,"g":"Soup (Lunch, Dinner)","ch":[{"w":"ကြက်သားစွပ်ပြုတ်","e":"Chicken Soup"},{"w":"ယိုးဒယား၁၂မျိုးဟင်းချို","e":"Thai Tomyam Soup"},{"w":"ချဉ်ရည်ဟင်း","e":"Sour Soup"},{"w":"ပဲနီလေးဟင်းချို","e":"Lentil Soup"},{"w":"ကုလားပဲဟင်း","e":"Indian style Gram Soup"}]},{"id":284,"w":"ပူတင်း","m":"Pudding","c":28,"g":"Dessert & Sweets","ch":[{"w":"မုန့်လုံးရေပေါ်","e":"Rice ball with jaggery juice"},{"w":"မုန့်လက်ဆောင်း","e":"Rice flakes in coconut & jaggery juice"},{"w":"ဟာလဝါ","e":"Sweet & oily rice cake"},{"w":"ဆနွင်းမကင်း","e":"Burmese Rice Pudding"},{"w":"သာကူ","e":"Sago"},{"w":"ဖါလူဒါ","e":"Indian Desert with ice cream on top"},{"w":"ရေခဲမုန့်","e":"Ice Cream"},{"w":"မလိုင်လုံး","e":"Sweet & Creamy balls"},{"w":"ဆီးယို","e":"Plum dessert in jaggery jam"}]},{"id":294,"w":"ကော်ဖီ","m":"Coffee + sweet condensed milk","c":1,"g":"Drinks & beverages","ch":[{"w":"လက်ဖက်ရည်ကြမ်း","e":"Chinese black (green) tea"},{"w":"လက်ဖက်ရည်","e":"Red tea + milk + sugar"},{"w":"သောက်ရေသန့်","e":"Purified drinking water"},{"w":"လိမ္မော်ရည်","e":"Orange juice"},{"w":"သံပရာရည်","e":"Lime juice"},{"w":"ရှောက်ဖျော်ရည်","e":"Lemonade"},{"w":"ဆီးဖျော်ရည်","e":"Prune juice"},{"w":"အုန်းရည်","e":"Coconut water (juice)"},{"w":"ကြံရည်","e":"Sugar cane juice"},{"w":"ထောပတ်သီးဖျော်ရည်","e":"Avocado juice"},{"w":"နာနတ်ဖျော်ရည်","e":"Pine apple juice"},{"w":"ပင်မှည့်ဖျော်ရည်","e":"Passion fruit juice"},{"w":"မန်ကျည်းဖျော်ရည်","e":"Tamarind juice"},{"w":"ပန်းသီးဖျော်ရည်","e":"Apple juice"},{"w":"ဖရဲသီးဖျော်ရည်","e":"Water Melon juice"},{"w":"လိုင်ချီးဖျော်ရည်","e":"Lichee juice"},{"w":"စတော်ဘယ်ရီဖျော်ရည်","e":"Strawberry + condensed milk drink"},{"w":"သီးစုံဖျော်ရည်","e":"Mixed fruit juice"},{"w":"ကိုကာကိုလာ","e":"Coca Cola"},{"w":"ပက်စီ","e":"Pepsi"},{"w":"ဘီယာ","e":"Beer"},{"w":"ဝိုင်","e":"Wine"},{"w":"ဝိုင်အနီ","e":"Red wine"},{"w":"ဝိုင်အဖြူ","e":"White wine"},{"w":"အရက်","e":"Alcohol / Liquor"},{"w":"ကော့ညက်","e":"Cognac"},{"w":"ဂျင်","e":"Jin"},{"w":"ဘရန်ဒီ","e":"Brandy"},{"w":"ရမ်","e":"Rum"},{"w":"ဗော့ကာ","e":"Vodka"},{"w":"မာတီနီ","e":"Martini"},{"w":"ရှယ်ရီ","e":"Sherry"},{"w":"ရှမ်ပိန်","e":"Champange"}]}];

const OVR={"တိရစ္ဆာန်များ":"ति1य1स्सान1म्या3","ခန္ဓာကိုယ်":"खन्धा2को2ये³¹12"};
const CM={"က":"क","ခ":"ख","ဂ":"ग","ဃ":"घ","င":"ङ","စ":"स","ဆ":"स","ဇ":"ज","ဈ":"झ","ဉ":"ज्ञ","ည":"ज्ञ","ဋ":"ट","ဌ":"ठ","ဍ":"ड","ဎ":"ढ","ဏ":"न","တ":"त","ထ":"थ","ဒ":"द","ဓ":"ध","န":"न","ပ":"प","ဖ":"फ","ဗ":"ब","ဘ":"ब","မ":"म","ယ":"य","ရ":"य","လ":"ल","ဝ":"व","သ":"थ","ဟ":"ह","ဠ":"ल","အ":"अ","ဥ":"उ","ဧ":"इ","ဿ":"स्स"};
const CC={"ကျ":"च","ကြ":"च","ကွ":"क्व","ကှ":"क्ह","ကွှ":"क्व","ချ":"छ","ခြ":"छ","ခွ":"ख्व","ခှ":"ख्ह","ခွှ":"ख्व","ဂျ":"ज","ဂြ":"ज","ဂွ":"ग्व","ဂှ":"ग्ह","ငြ":"ग","ငှ":"ङ्ह","တျ":"त्य","တြ":"त्य","တွ":"त्व","တှ":"त्ह","ထျ":"थ्य","ထြ":"थ्य","ထွ":"थ्व","ဒျ":"द्य","ဒြ":"द्य","ဒွ":"द्व","နျ":"न्य","နြ":"न्य","နွ":"न्व","နှ":"न्ह","ပျ":"प्य","ပြ":"प्य","ပွ":"प्व","ပှ":"प्ह","ဖျ":"फ्य","ဖြ":"फ्य","ဖွ":"फ्व","ဗျ":"ब्य","ဗြ":"ब्य","ဘျ":"ब्य","ဘြ":"ब्य","ဘွ":"ब्व","မျ":"म्य","မြ":"म्य","မွ":"म्व","မှ":"म्ह","ယွ":"य्व","ရွ":"य्व","ရှ":"श","လျ":"ल्य","လြ":"ल्य","လွ":"ल्व","လှ":"ल्ह","သျ":"थ्य","သြ":"थ्य","သွ":"थ्व","သှ":"थ्ह","ဟျ":"ह्य","ဟြ":"ह्य","ဟွ":"ह्व"};
const VM={"":"1","ာ":"ा2","ား":"ा3","ိ":"ि1","ီ":"ि2","ီး":"ि3","ု":"ु1","ူ":"ु2","ူး":"ु3","ို":"ो2","ို့":"ो1","ိုး":"ोए","ေ":"े2","ေ့":"े11","ေး":"े3","ော":"ौ3","ော့":"ौ1","ော်":"ौ2","ဲ":"े³¹13","ဲ့":"े³¹111","ံ":"ं32","ံ့":"ं31","င်":"िन2","င့်":"िन1","င်း":"िन3","န်":"ं12","န့်":"ं11","န်း":"ं13","မ်":"ं22","မ့်":"ं21","မ်း":"ं23","ည်":"े³¹22","ည့်":"े³¹21","ည်း":"े³¹23","ယ်":"े³¹12","ယ့်":"े³¹11","ိန်":"ेन12","ိန့်":"ेन11","ိန်း":"ेन13","ိမ်":"ेन22","ိမ့်":"ेन21","ိမ်း":"ेन23","ိုင်":"ाइन2","ိုင့်":"ाइन1","ိုင်း":"ाइन3","ိုက်":"ाइ","ောင်":"ौं2","ောင့်":"ौं1","ောင်း":"ौं3","ောက်":"ौ?1","ုန်":"ों12","ုန့်":"ों11","ုန်း":"ों13","ုံ":"ों22","ုံ့":"ों21","ုံး":"ों23","ုဏ်":"ों32","ုဏ့်":"ों31","ုဏ်း":"ों33","ွန်":"ुन12","ွန့်":"ुन11","ွန်း":"ुन13","ွမ်":"ुन22","ွမ့်":"ुन21","ွမ်း":"ुन23","ွံ":"ुन32","ွံ့":"ुन31","ွံး":"ुन33","ွတ်":"ुत1","ွပ်":"ुत2","တ်":"त1","ပ်":"त2","ဒ်":"त3","ာတ်":"त4","ာသ်":"त5","ိတ်":"ै1","ိပ်":"ै2","ုတ်":"ोट","ုပ်":"ोप","က်":"ेत","စ်":"े?2","ေတ်":"े?1","ဏ်":"ं4","ြက်":"ेत"};
function isMM(c){const x=c.charCodeAt(0);return x>=0x1000&&x<=0x109F}
function ce(w,s){let i=s+1;while(i<w.length){const c=w.charCodeAt(i);if(c>=0x103B&&c<=0x103E)i++;else if(c===0x1039&&i+1<w.length)i+=2;else break}return i}
function se(w,s){let i=ce(w,s);while(i<w.length){const c=w.charCodeAt(i);if((c>=0x102B&&c<=0x1036)||c===0x1037||c===0x1038||c===0x103A)i++;else if(c>=0x1000&&c<=0x1021&&i+1<w.length&&w.charCodeAt(i+1)===0x103A){i+=2;while(i<w.length&&(w.charCodeAt(i)===0x1037||w.charCodeAt(i)===0x1038))i++;break}else break}return i}
function toDev(word){
  if(!word)return'';if(OVR[word])return OVR[word];
  let r='',i=0;
  while(i<word.length){
    if(!isMM(word[i])){r+=word[i];i++;continue}
    const s=se(word,i),c=ce(word,i),cp=word.slice(i,c),vp=word.slice(c,s);
    const cd=CC[cp]||CM[cp];
    if(cd!==undefined){const vd=VM[vp];if(vd!==undefined){r+=cd+vd;i=s;continue}if(vp===''){r+=cd;i=s;continue}}
    if(CM[word[i]]){r+=CM[word[i]];i++;continue}
    r+='·';i++
  }
  return r
}

const S={root:{background:'#0E0E0E',minHeight:'100vh',color:'#F5E6C8',fontFamily:"'Noto Sans Myanmar','Noto Sans Devanagari',system-ui,sans-serif",padding:'14px 10px',maxWidth:880,margin:'0 auto'},gold:'#C8A951',orange:'#E8845C',blue:'#6BA4B8'};

export default function App(){
  const[view,setView]=useState(0);
  const tabs=[{l:'Grid',i:'⊞'},{l:'Tree',i:'◎'},{l:'List',i:'☰'},{l:'Cards',i:'▦'}];
  const totalCh=useMemo(()=>HUBS.reduce((s,h)=>s+h.ch.length,0),[]);

  return(
    <div style={S.root}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600&display=swap');*{box-sizing:border-box;margin:0}button{font-family:inherit}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(200,169,81,.3);border-radius:4px}input::placeholder{color:#555}`}</style>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <h1 style={{fontSize:18,fontWeight:700,color:S.gold}}>မြန်မာ <span style={{fontSize:12,color:'#666',fontWeight:400}}>Burmese Study</span></h1>
      </div>

      <div style={{display:'flex',gap:14,justifyContent:'center',padding:'8px 0 14px',marginBottom:12,borderBottom:'1px solid rgba(255,255,255,.05)'}}>
        {[{l:'Consonants',v:CONS.length,c:S.gold},{l:'Hubs',v:HUBS.length,c:S.orange},{l:'Spokes',v:totalCh,c:S.blue}].map((s,i)=>(
          <div key={i} style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:'#555'}}>{s.l}</div></div>
        ))}
      </div>

      <div style={{display:'flex',gap:2,marginBottom:12,background:'rgba(255,255,255,.03)',borderRadius:10,padding:3}}>
        {tabs.map((t,i)=>(<button key={i} onClick={()=>setView(i)} style={{flex:1,padding:'8px 0',borderRadius:8,border:'none',background:view===i?'rgba(200,169,81,.18)':'transparent',color:view===i?S.gold:'#555',fontSize:13,fontWeight:view===i?600:400,cursor:'pointer'}}>{t.i} {t.l}</button>))}
      </div>

      <div style={{background:'rgba(255,255,255,.015)',borderRadius:14,border:'1px solid rgba(255,255,255,.05)',padding:14,minHeight:300}}>
        {view===0&&<GridView/>}{view===1&&<TreeView/>}{view===2&&<ListView/>}{view===3&&<CardsView/>}
      </div>
      <EngineTest/>
    </div>
  )
}

function GridView(){
  const[selC,setSelC]=useState(null);
  const[selH,setSelH]=useState(null);
  const hubsForC=useMemo(()=>selC?HUBS.filter(h=>h.c===selC.id):[],[selC]);

  return(<div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(58px,1fr))',gap:5,marginBottom:16}}>
      {CONS.map(c=>{const act=selC?.id===c.id;return(
        <button key={c.id} onClick={()=>{setSelC(act?null:c);setSelH(null)}} style={{background:act?S.gold:'rgba(200,169,81,.1)',border:act?`2px solid ${S.gold}`:`1px solid rgba(200,169,81,.2)`,borderRadius:10,padding:'8px 2px',cursor:'pointer'}}>
          <div style={{fontSize:22,color:act?'#111':'#F5E6C8',fontWeight:600}}>{c.b}</div>
          <div style={{fontSize:9,color:act?'#444':'#555'}}>{c.r}</div>
          <div style={{fontSize:8,color:act?'#666':'#444',marginTop:1}}>{c.h} hubs</div>
        </button>
      )})}
    </div>
    {selC?(<div>
      <div style={{fontSize:13,color:'#777',marginBottom:10}}>
        <span style={{fontSize:22,color:S.gold,fontWeight:700}}>{selC.b}</span>
        <span style={{marginLeft:8,color:'#555'}}>{selC.r}</span>
        <span style={{marginLeft:8}}>{hubsForC.length} hubs · {hubsForC.reduce((s,h)=>s+h.ch.length,0)} spokes</span>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:12}}>
        {hubsForC.map(h=>{const act=selH?.id===h.id;return(
          <button key={h.id} onClick={()=>setSelH(act?null:h)} style={{background:act?'rgba(232,132,92,.15)':'rgba(200,169,81,.06)',border:`1px solid ${act?'rgba(232,132,92,.3)':'rgba(200,169,81,.12)'}`,borderRadius:10,padding:'5px 10px',cursor:'pointer',textAlign:'left'}}>
            <div style={{fontSize:14,color:act?S.orange:S.gold,fontWeight:600}}>{h.w}</div>
            <div style={{fontSize:10,color:'#888'}}>{h.m} <span style={{color:'#555'}}>· {h.ch.length}w</span></div>
          </button>
        )})}
      </div>
      {selH&&selH.ch.length>0&&(
        <div style={{background:'rgba(232,132,92,.04)',borderRadius:12,border:'1px solid rgba(232,132,92,.1)',padding:12}}>
          <div style={{fontSize:15,color:S.orange,fontWeight:700,marginBottom:8}}>
            {selH.w} <span style={{fontWeight:400,fontSize:12,color:'#888'}}>→ {selH.m}</span>
            <span style={{fontSize:10,color:'#555',marginLeft:8}}>({selH.g})</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:6}}>
            {selH.ch.map((c,i)=>{const d=toDev(c.w);return(
              <div key={i} style={{background:'rgba(107,164,184,.06)',border:'1px solid rgba(107,164,184,.12)',borderRadius:10,padding:'7px 10px'}}>
                <div style={{fontSize:15,color:'#F5E6C8'}}>{c.w}</div>
                <div style={{fontSize:10,color:'#666'}}>{d}</div>
                <div style={{fontSize:11,color:S.blue,marginTop:2}}>{c.e}</div>
              </div>
            )})}
          </div>
        </div>
      )}
      {selH&&selH.ch.length===0&&<div style={{color:'#555',fontSize:12,padding:12}}>This hub has no child words yet</div>}
    </div>):(<div style={{textAlign:'center',color:'#555',padding:30,fontSize:13}}>Tap a consonant to see its hubs and word spokes</div>)}
  </div>)
}

function TreeView(){
  const[selC,setSelC]=useState(null);
  const hubsForC=useMemo(()=>selC?HUBS.filter(h=>h.c===selC):[],[selC]);
  return(<div>
    <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:14}}>
      {CONS.map(c=>{const act=selC===c.id;return(
        <button key={c.id} onClick={()=>setSelC(act?null:c.id)} style={{padding:'5px 12px',borderRadius:10,border:`1px solid ${act?S.gold:'rgba(255,255,255,.06)'}`,background:act?'rgba(200,169,81,.18)':'transparent',color:act?S.gold:'#777',fontSize:14,fontWeight:600,cursor:'pointer'}}>
          {c.b} <span style={{fontSize:10,fontWeight:400}}>{c.h}</span>
        </button>
      )})}
    </div>
    {selC?(<div>
      {hubsForC.map(h=>(
        <div key={h.id} style={{marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <div style={{background:'rgba(232,132,92,.12)',border:'1px solid rgba(232,132,92,.25)',borderRadius:12,padding:'6px 14px',display:'inline-flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:18,color:S.orange,fontWeight:700}}>{h.w}</span>
              <span style={{fontSize:12,color:'#888'}}>{h.m}</span>
            </div>
            <span style={{fontSize:10,color:'#555'}}>{h.ch.length} spokes · {h.g}</span>
          </div>
          {h.ch.length>0&&(
            <div style={{display:'flex',flexWrap:'wrap',gap:5,paddingLeft:18,borderLeft:'2px solid rgba(232,132,92,.15)'}}>
              {h.ch.map((c,i)=>(
                <div key={i} style={{background:'rgba(107,164,184,.05)',border:'1px solid rgba(107,164,184,.1)',borderRadius:8,padding:'5px 10px'}}>
                  <div style={{fontSize:14,color:'#F5E6C8'}}>{c.w}</div>
                  <div style={{fontSize:10,color:'#666'}}>{toDev(c.w)}</div>
                  <div style={{fontSize:10,color:S.blue}}>{c.e}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>):(<div style={{textAlign:'center',color:'#555',padding:30,fontSize:13}}>Select a consonant to see its hub-spoke tree</div>)}
  </div>)
}

function ListView(){
  const[q,setQ]=useState('');
  const[openId,setOpenId]=useState(null);
  const consMap=useMemo(()=>{const m={};CONS.forEach(c=>m[c.id]=c);return m},[]);
  const filtered=useMemo(()=>{
    if(!q)return HUBS;
    const f=q.toLowerCase();
    return HUBS.filter(h=>h.w.includes(q)||(h.m||'').toLowerCase().includes(f)||h.g.toLowerCase().includes(f)||h.ch.some(c=>c.w.includes(q)||(c.e||'').toLowerCase().includes(f)));
  },[q]);
  return(<div>
    <input type="text" placeholder="Search hub, word, meaning, or group..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:'9px 12px',borderRadius:10,border:'1px solid rgba(255,255,255,.08)',background:'rgba(255,255,255,.03)',color:'#F5E6C8',fontSize:14,outline:'none',marginBottom:10,boxSizing:'border-box'}}/>
    <div style={{maxHeight:440,overflowY:'auto'}}>
      {filtered.map(h=>{const open=openId===h.id;const cn=consMap[h.c];return(
        <div key={h.id}>
          <button onClick={()=>setOpenId(open?null:h.id)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 8px',background:open?'rgba(200,169,81,.05)':'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,.03)',cursor:'pointer'}}>
            <div style={{textAlign:'left',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:12,color:'#555',background:'rgba(200,169,81,.08)',padding:'1px 5px',borderRadius:5}}>{cn?.b||'?'}</span>
              <span style={{fontSize:16,color:S.gold,fontWeight:600}}>{h.w}</span>
              <span style={{fontSize:9,color:'#444',background:'rgba(255,255,255,.03)',padding:'1px 5px',borderRadius:4}}>{h.g}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:11,color:'#999',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{h.m}</span>
              <span style={{fontSize:10,color:S.blue}}>{h.ch.length}w</span>
              <span style={{color:'#444',fontSize:10,transform:open?'rotate(90deg)':'none',transition:'transform .15s'}}>▶</span>
            </div>
          </button>
          {open&&h.ch.length>0&&(
            <div style={{padding:'4px 10px 8px 30px',background:'rgba(200,169,81,.02)'}}>
              {h.ch.map((c,i)=>{const d=toDev(c.w);return(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:i<h.ch.length-1?'1px solid rgba(255,255,255,.02)':'none'}}>
                  <div><span style={{fontSize:14,color:'#F5E6C8'}}>{c.w}</span><span style={{fontSize:10,color:'#555',marginLeft:6}}>{d}</span></div>
                  <span style={{fontSize:11,color:S.blue}}>{c.e}</span>
                </div>
              )})}
            </div>
          )}
          {open&&h.ch.length===0&&<div style={{padding:'6px 10px 8px 30px',color:'#444',fontSize:11}}>Hub only — no spokes yet</div>}
        </div>
      )})}
    </div>
    <div style={{fontSize:9,color:'#444',textAlign:'center',marginTop:6}}>Showing {filtered.length} of {HUBS.length} hubs</div>
  </div>)
}

function CardsView(){
  const[flipped,setFlipped]=useState({});
  const[filt,setFilt]=useState('all');
  const filtered=useMemo(()=>{
    const hs=filt==='all'?HUBS:HUBS.filter(h=>h.c===parseInt(filt));
    const cards=[];
    hs.forEach(h=>{
      cards.push({id:'h'+h.id,w:h.w,e:h.m,type:'hub',nch:h.ch.length,g:h.g});
      h.ch.forEach((c,i)=>cards.push({id:'c'+h.id+'_'+i,w:c.w,e:c.e,type:'spoke',hub:h.w}));
    });
    return cards;
  },[filt]);
  return(<div>
    <div style={{display:'flex',gap:4,marginBottom:10,flexWrap:'wrap'}}>
      <Pill a={filt==='all'} o={()=>setFilt('all')}>All ({HUBS.length})</Pill>
      {CONS.map(c=><Pill key={c.id} a={filt===String(c.id)} o={()=>setFilt(String(c.id))}>{c.b} ({c.h})</Pill>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:7,maxHeight:430,overflowY:'auto'}}>
      {filtered.slice(0,100).map(c=>{const fl=flipped[c.id];const isHub=c.type==='hub';return(
        <button key={c.id} onClick={()=>setFlipped(p=>({...p,[c.id]:!p[c.id]}))} style={{background:fl?(isHub?'rgba(232,132,92,.12)':'rgba(107,164,184,.08)'):(isHub?'rgba(232,132,92,.05)':'rgba(255,255,255,.02)'),border:`1px solid ${isHub?'rgba(232,132,92,.2)':'rgba(107,164,184,.1)'}`,borderRadius:12,padding:10,cursor:'pointer',textAlign:'center',minHeight:80,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          {!fl?(<>
            <div style={{fontSize:isHub?17:15,color:isHub?S.orange:'#F5E6C8',fontWeight:isHub?700:400}}>{c.w}</div>
            {isHub&&<div style={{fontSize:8,color:'#666',marginTop:2}}>{c.nch} spokes · {c.g}</div>}
            {!isHub&&<div style={{fontSize:8,color:'#444',marginTop:2}}>tap to reveal</div>}
          </>):(<>
            <div style={{fontSize:13,color:'#F5E6C8'}}>{c.w}</div>
            <div style={{fontSize:10,color:'#777'}}>{toDev(c.w)}</div>
            <div style={{fontSize:11,color:isHub?S.orange:S.blue,fontWeight:600,marginTop:2}}>{c.e}</div>
            {c.hub&&<div style={{fontSize:9,color:'#555',marginTop:2}}>← {c.hub}</div>}
          </>)}
        </button>
      )})}
    </div>
    <div style={{fontSize:9,color:'#444',textAlign:'center',marginTop:6}}>Showing {Math.min(filtered.length,100)} of {filtered.length}</div>
  </div>)
}

function Pill({children,a,o}){return(<button onClick={o} style={{padding:'3px 10px',borderRadius:14,fontSize:10,cursor:'pointer',border:`1px solid ${a?S.gold:'rgba(255,255,255,.06)'}`,background:a?'rgba(200,169,81,.18)':'transparent',color:a?S.gold:'#555'}}>{children}</button>)}

function EngineTest(){
  const[inp,setInp]=useState('ခွေး');
  const out=useMemo(()=>toDev(inp),[inp]);
  const samples=['ခွေး','ကြောင်','နွား','ပန်းသီး','ဘီယာ','ကော်ဖီ','မုန့်ဟင်းခါး','အရောင်များ'];
  return(<div style={{marginTop:14,padding:10,borderRadius:10,background:'rgba(200,169,81,.03)',border:'1px solid rgba(200,169,81,.08)'}}>
    <div style={{fontSize:10,color:'#666',marginBottom:5}}>Transliteration Engine</div>
    <div style={{display:'flex',gap:6}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Burmese..." style={{flex:1,padding:'7px 10px',borderRadius:8,border:'1px solid rgba(255,255,255,.08)',background:'rgba(255,255,255,.03)',color:'#F5E6C8',fontSize:15,outline:'none'}}/>
      <div style={{flex:1,padding:'7px 10px',borderRadius:8,background:'rgba(200,169,81,.06)',border:'1px solid rgba(200,169,81,.12)',fontSize:15,color:S.gold,display:'flex',alignItems:'center'}}>{out||<span style={{color:'#444'}}>—</span>}</div>
    </div>
    <div style={{display:'flex',gap:4,marginTop:5,flexWrap:'wrap'}}>{samples.map(w=>(<button key={w} onClick={()=>setInp(w)} style={{padding:'2px 7px',borderRadius:6,fontSize:11,background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.05)',color:'#888',cursor:'pointer'}}>{w}</button>))}</div>
  </div>)
}
