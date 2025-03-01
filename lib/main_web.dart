import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Krishi Vaidhya Web',
      home: Scaffold(
        appBar: AppBar(title: Text('Welcome to Krishi Vaidhya')),
        body: Center(child: Text('This is the web version of Krishi Vaidhya.')),
      ),
    );
  }
}
