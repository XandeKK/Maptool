RSpec.describe App do
	include Rack::Test::Methods

	def app
		App
	end

	it "get root" do
    get '/'
    expect(last_response).to be_ok
  end
end