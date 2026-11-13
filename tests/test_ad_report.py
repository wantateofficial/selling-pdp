import importlib.util
import pathlib
import unittest
import sys
import types
try:
    import requests
except ModuleNotFoundError:
    sys.modules["requests"] = types.ModuleType("requests")

spec = importlib.util.spec_from_file_location('report', pathlib.Path(__file__).parents[1] / 'scripts/ad_reporting/report.py')
report = importlib.util.module_from_spec(spec)
spec.loader.exec_module(report)

class ReportingTest(unittest.TestCase):
    def test_ctr_weighted_by_impressions(self):
        lines, spend = report.summarize_meta([{'spend':'1250','impressions':'200','inline_link_clicks':'5'}], [
            {'publisher_platform':'instagram','platform_position':'feed','impressions':'100','inline_link_clicks':'2'},
            {'publisher_platform':'instagram','platform_position':'feed','impressions':'300','inline_link_clicks':'3'}])
        self.assertEqual(spend, 1250)
        self.assertIn('2.50%', lines[0])
        self.assertIn('1.25%', lines[-1])
    def test_zero_impressions_are_not_divided(self):
        self.assertEqual(report.pct(0, 0), '데이터 없음')

if __name__ == '__main__': unittest.main()
