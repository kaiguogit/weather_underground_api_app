# Homepage (Root path)
get '/' do
  erb :index
end

get "/api_key" do
  json({api_key: ENV['api_key']})
end