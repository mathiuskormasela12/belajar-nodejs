// ===== Flasher

class Flasher {
	static setFlash(req, type, message) {
		req.session.type = type;
		req.session.message = message;
	}

	static removeFlash(req) {
		req.session.type	= false;
		req.session.message = false;
	}
}

module.exports = Flasher;
