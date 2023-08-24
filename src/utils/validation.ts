export const validateEmail = (value:string) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (reg.test(value)) {
		return null;
	} else {
		return value ? 'Invalid email' : 'Please enter your email';
	}
};

export const validateName = (value:string) => {
	if (value) {
		let reg = /^[a-z ]+$/i;
		if (reg.test(value)) {
			return null;
		} else {
			return value ? 'Only letters and spaces are allowed' : 'Please enter your name';
		}
	} else {
		return 'Please enter your name';
	}
};

export const validateSheet = (value:string | null |undefined,avalibalesheet:number) => {
   if(value && value !== undefined) {
      if(avalibalesheet < parseFloat(value)){
        return 'Number of seats selected is more than available seats';
      }
      return null;
   }
   return 'Please select number of seats';
}