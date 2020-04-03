//color list
const colorSet = [
{color: "#FF00FF"},   
  {color: "#FFFF00"},  
  {color: "#00FFFF"},  
  {color: "#FF0000"},  
  {color: "#00FF00"},  
  {color: "#0000FF"},  
    
  {color: "white"} ,
  {color: 'black'},
  {color: 'cornsilk'},
  {color: 'gold'},
  {color: 'aquamarine'},
  {color: 'deepskyblue'},
     
  {color: 'teal'},
  {color: 'violet'},
  {color: 'midnightblue'},
  {color: 'yellowgreen'},
  {color: 'crimson'},
  {color: 'lightseagreen'},
    
  {color: 'salmon'},
  {color: '#00FA9A'},  
  {color: 'darkred'},  
  {color: 'darkslategrey'},      
  {color: 'darkorchid'},
  {color: 'darkorange'},
    
  {color: 'lightsteelblue'},
  {color: 'skyblue'},
  {color: '#8B4513'},
  {color: 'khaki'}, 
  {color: 'palegoldenrod'},  
  {color: 'navy'},
    
  {color: 'deeppink'},
  {color: 'royalblue'},
  {color: 'orangered'},
  {color: 'greenyellow'}, 
  {color: 'tomato'},  
  {color: 'forestgreen'},
    
  {color: '#00163a'},
  {color: '#21003a'},
  {color: '#3a1d00'},
  {color: '#969696'}, 
  {color: '#494949'}, 
  {color: '#2d2d2d'}

];

function SettingsPage(props) {
  return (
    <Page>
      
      <Section
        title={<Text bold align="center">SECOND'S ARC TICKER</Text>}>
        <ColorSelect
          settingsKey="ARCcolor"
          colors={colorSet}  />
      </Section>
      <Section
        title={<Text bold align="center">HOURS:MINUTE</Text>}>
        <ColorSelect
          settingsKey="HMcolor"
          colors={colorSet}  />
      </Section>
    
       <Section
        title={<Text bold align="center">DATE</Text>}>
        <ColorSelect
          settingsKey="DATEcolor"
          colors={colorSet}  />
      </Section>
            
    </Page>
  );
}

registerSettingsPage(SettingsPage);