const sampleEquation = ['C2NH4+O2', '2CO2+2H2O'] // C2 N H4  +  O2  →   2 C O2  +  2 H2 O

var elementObj = {reactants: {}, products: {}} // Stores every element's number

const coefficients = (equation) => {
  equation.forEach((part, index) => {
  	var partOfEquation = 'reactants'
  	if (index) {
  		partOfEquation = 'products'
  	}

    part = part.replace(/\s/g, '') // Removes all spaces from the equation
    part = part.split('+') // Separates all molecules

    part.forEach((molecule, index) => {
      const multiplier = molecule.match(/^\d+/) // Stores the molecule's stoichiometric coefficient
      var elementsArray = molecule.split(/(?=[A-Z])/) // Gets every different element
      if (multiplier) { elementsArray.shift() } // Removes the empty element from elementsArray
      var elementsNumber = [] // Stores each element's number

      elementsArray.forEach((element, index) => {
      	// Gets the number of each element
      	if (Array.isArray(element.match(/\d+$/))) { // Find out if the element's number > 1
      	  const number = parseInt(element.match(/\d+$/)[0])
      	  elementsNumber.push(number)
      	} else {
      	  elementsNumber.push(1) // It's 1
      	}
      	// Remove the number from the elementArray
      	elementsArray[index] = element.split(/\d+$/)[0]
      	// Adds the number to the elementObj * stoichiometric coefficient
      	if (!elementObj[partOfEquation][elementsArray[index]]) { elementObj[partOfEquation][elementsArray[index]] = 0 }
      	if (multiplier) {
	      	elementObj[partOfEquation][elementsArray[index]] += elementsNumber[index] * parseInt(multiplier[0])
	      } else {
        	elementObj[partOfEquation][elementsArray[index]] += elementsNumber[index]
	      }
      })
    })
  })
  console.log(elementObj)
}

coefficients(sampleEquation)
// TODO: Suport for parentesis
// TODO: Actually doing something with the data
