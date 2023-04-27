import React from "react";

const Modal = ({ setModalShow }) => {
	return (
		<div
			class="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			{/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					{/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
					<div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
									<h3
										class="text-base font-semibold leading-6 text-gray-900"
										id="modal-title"
									>
										Send a new password
									</h3>
									<div class="mt-2">
										<div className="flex flex-col w-full gap-2">
											<input
												type="text"
												className="bg-white w-full placeholder-gray-700 border outline-none border-gray-700 px-5 md:px-6 text-sm py-4 rounded-xl"
												placeholder="Norwegian ID *"
												name="password"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
								onClick={() => setModalShow(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								class="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-green-500 sm:mt-0 sm:w-auto"
								onClick={() => setModalShow(false)}
							>
								Send Pin
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
