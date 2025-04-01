
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.getElementById('pageHeader');
    const clickedText = getQueryParam('Pod');
    const audioPlayer = document.getElementById('myAudio');
    const summaryElement = document.getElementById('summary');
    const toggle = document.getElementById('LangToggle');
    const authors = document.getElementById('authors-string');

    let authorstext = ''
    let englishJsonFile = './audio/summary-en.json'; // Default JSON file    
    let arabicJsonFile = './audio/summary-ar.json'; // arabic JSON file    
    let currentJsonFile = './audio/summary-en.json';
    let currentDirection = '';
    let episodeTitle = '';
    

    

    if (clickedText) {
      
      if (clickedText == 'SHSpodcast') {
          episodeTitle = 'Genetics of Composite Sleep Health Scores in 413,904 Individuals'
          audioPlayer.src = `Genetics of Composite Sleep Health Scores in 413,904 Individuals.wav`
          authorstext = "Goodman MO, Faquih T, Paz V, Nagarajan P, Lane JM, Spitzer B, Maher M, Chung J, Cade BE, Purcell SM, Zhu X, Noordam R, Phillips AJK, Kyle SD, Spiegelhalder K, Weedon MN, Lawlor DA, Rotter JI, Taylor KD, Isasi CR, Sofer T, Dashti HS, Rutter MK, Redline S, Saxena R, Wang H."
          headerElement.textContent = episodeTitle;
          $(".banner-image-pod").backstretch('images/SHS.jpg');
      } else if (clickedText == 'MetaboAgePod'){
          audioPlayer.src = "audio/Metabolomic Prediction of Age Using Endogenous and Xenobiotic Metabolites.wav"
          episodeTitle = 'Metabolomic Prediction of Age Using Endogenous and Xenobiotic Metabolites'
          headerElement.textContent = episodeTitle;  
          authorstext = "Faquih TO, van Hylckama Vlieg A, Surendran P, Butterworth AS, Li-Gao R, de Mutsert R, Rosendaal FR, Noordam R, van Heemst D, Willems van Dijk K, Mook-Kanamori DO."
          $(".banner-image-pod").backstretch('images/portfolio-7.png');
      } else if (clickedText == 'pfaspod'){
        audioPlayer.src = "audio/PFAS Exposure Links to Unfavorable Cardio-Metabolic Profiles.wav"
        episodeTitle = 'PFAS Exposure Links to Unfavorable Cardio-Metabolic Profiles'
        headerElement.textContent = episodeTitle;   
        authorstext = "Faquih, T.O., Landstra, E.N., van Hylckama Vlieg, A. et al."
        $(".banner-image-pod").backstretch('images/portfolio-5.png');

    }
      
    } else {
      headerElement.textContent = 'Welcome!'; // Optional default text
    }

    authors.textContent = authorstext;

    function setInitialState() {
        const savedState = localStorage.getItem('lang');
        let isArabic = false;
        if (savedState === 'ar' ) {
            isArabic = true;
            toggle.checked = true;
            currentDirection = 'rtl';
            // summaryElement.dir = 
            currentJsonFile = arabicJsonFile;
        } else {
            toggle.checked = false;
            // summaryElement.dir = 'ltr';
            currentDirection = 'ltr';

            currentJsonFile = englishJsonFile;
        }
    }

    setInitialState();

    function loadSummary(jsonFile, pDirection) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                let summary = data[clickedText] || 'Summary not available for this Project.';
                const htmlSummary = summary
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/_(.*?)_/g, '<em>$1</em>')
                    .replace(/^- (.*)$/gm, '<li>$1</li>')
                    .replace(/\n/g, '<br>');
                summaryElement.innerHTML = htmlSummary;
                summaryElement.dir = pDirection;
            })
            .catch(error => {
                summaryElement.textContent = 'Failed to load summary.';
            });
    }

    loadSummary(currentJsonFile, currentDirection);

    LangToggle.addEventListener('change', function() {
        if (this.checked) {
            currentJsonFile = arabicJsonFile; 
            loadSummary(currentJsonFile, 'rtl');
            localStorage.setItem('lang', 'ar');
            
            
        } else {
            currentJsonFile = englishJsonFile; 
            loadSummary(currentJsonFile, 'ltr');
            localStorage.setItem('lang', 'en');

        }
    });

    
    // fetch(englishJsonFile)
    // .then(response => response.json())
    // .then(data => {
    //   summary = data[clickedText] || 'Summary not available for this Project.';
    //   // Convert Markdown to HTML here:
    //   const htmlSummary = summary
    //     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    //     .replace(/_(.*?)_/g, '<em>$1</em>')       // Italics
    //     .replace(/^- (.*)$/gm, '<li>$1</li>')  // List items
    //     .replace(/\n/g, '<br>');           // Newlines

    //   summaryElement.innerHTML = htmlSummary; // Use innerHTML
    //    })
    // .catch(error => {
    //   summaryElement.textContent = 'Failed to load summary.';
    // });

    
  });