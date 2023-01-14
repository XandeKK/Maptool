RSpec.describe Application do
	include Rack::Test::Methods

	def app
		Application
	end

	it "get root" do
    get '/'
    expect(last_response).to be_ok
  end
end