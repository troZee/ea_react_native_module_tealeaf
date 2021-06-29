require 'json'
package = JSON.parse(File.read('package.json'))
repository = package["repository"]["url"]

Pod::Spec.new do |s|
  s.name		       = package["name"]
  s.version	       = package["version"]
  s.description    = package["description"]
  s.homepage       = package["homepage"]
  s.summary        = package["summary"]
  s.license        = package["license"]
  s.authors        = package["author"]
  s.platforms      = { :ios => "9.0" }
  
  s.source         = { :git => repository, :tag => s.version }
  s.preserve_paths = 'README.md', 'package.json', '*.js'
  s.source_files   = "ios/**/*.{h,m}"
  
  s.dependency        'React'
  s.xcconfig       = { 'HEADER_SEARCH_PATHS' => '../../../ios/Pods/** ' }
	
  s.default_subspec = 'Core'
  s.subspec 'Core' do |core|
	  core.frameworks = 'SystemConfiguration', 'CoreTelephony', 'CoreLocation', 'WebKit'
	  core.library = 'z'
	  core.resource = "ios/Tealeaf/TLFResources.bundle"
	  core.xcconfig = { 'HEADER_SEARCH_PATHS' => '"$(PODS_ROOT)/ios/Tealeaf/TealeafReactNative.framework/Headers/"/** ' }
	  core.vendored_frameworks = 'ios/Tealeaf/TealeafReactNative.framework'
	  core.dependency 'EOCoreDebug', '2.2.6'
  end
  s.subspec 'MD5' do |md5|
	  md5.dependency 'TealeafMD5Debug'
	  md5.dependency 'IBMTealeafDebug/Core'
  end
  s.subspec 'SHA512' do |sha512|
	  sha512.dependency 'TealeafSHA2Debug'
	  sha512.dependency 'IBMTealeafDebug/Core'
  end
end