require 'json'
package = JSON.parse(File.read('package.json'))
repository = package["repository"]["url"]

Pod::Spec.new do |s|
	s.name				= package["name"]
	s.version			= package["version"]
	s.description       = package["description"]
	s.homepage          = package["homepage"]
	s.summary        	= "Component for react-native"
	s.license         	= package["license"]
	s.authors           = package["author"]
	s.source         	= { :git => repository, :tag => s.version }
	s.platform          = :ios, "9.0"
	s.preserve_paths    = 'README.md', 'package.json', '*.js'
	s.source_files      = "ios/RNCxa/**/*.{h,m}"
	s.dependency        'React'
	s.dependency        'IBMTealeafReactNativeDebug'
	s.xcconfig          = { 'HEADER_SEARCH_PATHS' => '../../../ios/Pods/** ' }
end